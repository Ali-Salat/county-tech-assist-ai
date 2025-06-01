
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { User, getUsersFromSupabase } from '@/services/supabaseService';

interface AuthContextType {
  user: SupabaseUser | null;
  userProfile: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: { name: string; department: string; role?: string }) => Promise<void>;
  signOut: () => Promise<void>;
  createDemoAccounts: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  session: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  createDemoAccounts: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          // Fetch user profile from our users table
          setTimeout(async () => {
            try {
              const users = await getUsersFromSupabase();
              const profile = users.find(u => u.email === session.user.email);
              setUserProfile(profile || null);
            } catch (error) {
              console.error('Error fetching user profile:', error);
            }
          }, 0);
        } else {
          setUserProfile(null);
        }
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string, userData: { name: string; department: string; role?: string }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: userData.name,
          department: userData.department,
          role: userData.role || 'user',
        },
      },
    });

    if (error) throw error;

    // Create user profile in our users table with special handling for ellisalat@gmail.com
    if (data.user) {
      const userRole = email === 'ellisalat@gmail.com' ? 'superuser' : (userData.role || 'user');
      
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: data.user.id,
          email: email,
          name: userData.name,
          department: userData.department,
          role: userRole,
        });

      if (profileError) {
        console.error('Error creating user profile:', profileError);
      }
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const createDemoAccounts = async () => {
    const demoAccounts = [
      {
        email: 'ellisalat@gmail.com',
        password: 'SuperUser123!',
        name: 'Ellis Salat',
        department: 'Information and Communication Technology',
        role: 'superuser',
        title: 'System Administrator'
      },
      {
        email: 'director@wajir.go.ke',
        password: 'WajirICT2024!',
        name: 'Mohamed Shahid',
        department: 'Information and Communication Technology',
        role: 'admin',
        title: 'Director ICT'
      },
      {
        email: 'ali.salat@wajir.go.ke',
        password: 'WajirICT2024!',
        name: 'Ali Salat',
        department: 'Information and Communication Technology',
        role: 'admin',
        title: 'Senior ICT Officer'
      },
      {
        email: 'ict.officer1@wajir.go.ke',
        password: 'WajirICT2024!',
        name: 'Ahmed Hassan',
        department: 'Information and Communication Technology',
        role: 'ict_officer',
        title: 'ICT Officer'
      },
      {
        email: 'user.demo@wajir.go.ke',
        password: 'WajirICT2024!',
        name: 'Fatuma Mohamed',
        department: 'Finance and Economic Planning',
        role: 'user',
        title: 'Accountant'
      }
    ];

    console.log('Creating demo accounts...');
    
    for (const account of demoAccounts) {
      try {
        // First try to sign up
        const { data, error } = await supabase.auth.signUp({
          email: account.email,
          password: account.password,
          options: {
            data: {
              name: account.name,
              department: account.department,
              role: account.role,
            },
          },
        });

        if (data.user && !error) {
          // Then create the profile
          const { error: profileError } = await supabase
            .from('users')
            .upsert({
              id: data.user.id,
              email: account.email,
              name: account.name,
              department: account.department,
              role: account.role,
              title: account.title,
            }, {
              onConflict: 'email'
            });

          if (profileError) {
            console.error(`Error creating profile for ${account.email}:`, profileError);
          } else {
            console.log(`Successfully created demo account: ${account.email}`);
          }
        } else if (error && error.message.includes('already registered')) {
          // Account already exists, just update the profile
          console.log(`Demo account ${account.email} already exists, updating profile...`);
          
          const { error: profileError } = await supabase
            .from('users')
            .upsert({
              email: account.email,
              name: account.name,
              department: account.department,
              role: account.role,
              title: account.title,
            }, {
              onConflict: 'email'
            });

          if (profileError) {
            console.error(`Error updating profile for ${account.email}:`, profileError);
          }
        }
      } catch (error) {
        console.error(`Error processing demo account ${account.email}:`, error);
      }
    }
    
    console.log('Demo accounts creation completed');
  };

  return (
    <AuthContext.Provider value={{
      user,
      userProfile,
      session,
      loading,
      signIn,
      signUp,
      signOut,
      createDemoAccounts,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
