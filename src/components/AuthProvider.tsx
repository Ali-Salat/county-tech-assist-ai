
import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { User as UserProfile } from "@/data/mockData";
import { toast } from "@/components/ui/sonner";

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, metadata?: { name: string; department: string }) => Promise<void>;
  signOut: () => Promise<void>;
  createDemoAccounts: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log('Initial session:', session);
        
        if (session?.user) {
          setUser(session.user);
          await fetchUserProfile(session.user.id, session.user.email);
        }
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        
        if (session?.user) {
          setUser(session.user);
          await fetchUserProfile(session.user.id, session.user.email);
        } else {
          setUser(null);
          setUserProfile(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string, email?: string) => {
    try {
      console.log('Fetching user profile for:', userId, email);
      
      // First check if user exists in our users table
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email || '')
        .maybeSingle();

      if (fetchError) {
        console.error('Error fetching user profile:', fetchError);
        return;
      }

      if (existingUser) {
        console.log('Found existing user:', existingUser);
        setUserProfile({
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email,
          role: existingUser.role as 'superuser' | 'admin' | 'ict_officer' | 'user',
          department: existingUser.department,
          title: existingUser.title
        });
      } else {
        // Create new user profile with special handling for demo accounts
        console.log('Creating new user profile for:', email);
        
        let role: 'superuser' | 'admin' | 'ict_officer' | 'user' = 'user';
        let name = email?.split('@')[0] || 'User';
        let department = 'General Services';
        let title = 'Staff Member';
        
        // Special handling for demo accounts
        if (email === 'demo.superuser@wajir.go.ke') {
          role = 'superuser';
          name = 'Demo Super Administrator';
          department = 'ICT, Trade, Investment and Industry';
          title = 'System Administrator';
        } else if (email === 'demo.admin@wajir.go.ke') {
          role = 'admin';
          name = 'Demo Administrator';
          department = 'ICT, Trade, Investment and Industry';
          title = 'ICT Administrator';
        } else if (email === 'demo.user@wajir.go.ke') {
          role = 'user';
          name = 'Demo User';
          department = 'General Services';
          title = 'Staff Member';
        } else if (email === 'ellisalat@gmail.com') {
          role = 'superuser';
          name = 'Ali Abdi Salat';
          department = 'ICT, Trade, Investment and Industry';
          title = 'System Administrator';
        }
        
        const { data: newUser, error: createError } = await supabase
          .from('users')
          .insert({
            id: userId,
            email: email || '',
            name: name,
            role: role,
            department: department,
            title: title
          })
          .select()
          .single();

        if (createError) {
          console.error('Error creating user profile:', createError);
          toast.error("Failed to create user profile");
          return;
        }

        console.log('Created new user:', newUser);
        setUserProfile({
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role as 'superuser' | 'admin' | 'ict_officer' | 'user',
          department: newUser.department,
          title: newUser.title
        });

        if (role === 'superuser') {
          toast.success("Welcome, System Administrator!", {
            description: "You have been granted super user privileges.",
          });
        }
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      throw error;
    }
  };

  const signUp = async (email: string, password: string, metadata?: { name: string; department: string }) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
        emailRedirectTo: `${window.location.origin}/`,
      },
    });
    
    if (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setUserProfile(null);
      toast.success("Signed out successfully");
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error("Error signing out");
    }
  };

  const createDemoAccounts = async () => {
    const demoAccounts = [
      {
        email: 'demo.superuser@wajir.go.ke',
        password: 'Demo123!',
        name: 'Demo Super Administrator',
        department: 'ICT, Trade, Investment and Industry',
        role: 'superuser'
      },
      {
        email: 'demo.admin@wajir.go.ke',
        password: 'Demo123!',
        name: 'Demo Administrator',
        department: 'ICT, Trade, Investment and Industry',
        role: 'admin'
      },
      {
        email: 'demo.user@wajir.go.ke',
        password: 'Demo123!',
        name: 'Demo User',
        department: 'General Services',
        role: 'user'
      }
    ];

    for (const account of demoAccounts) {
      try {
        await supabase.auth.signUp({
          email: account.email,
          password: account.password,
          options: {
            data: {
              name: account.name,
              department: account.department,
            },
          },
        });
      } catch (error) {
        console.log(`Demo account ${account.email} may already exist`);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      userProfile, 
      loading, 
      signIn, 
      signUp, 
      signOut, 
      createDemoAccounts 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
