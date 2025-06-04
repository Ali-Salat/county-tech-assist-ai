
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
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        
        if (session?.user) {
          setUser(session.user);
          // Use setTimeout to prevent potential recursion
          setTimeout(() => {
            fetchUserProfile(session.user.id, session.user.email);
          }, 0);
        } else {
          setUser(null);
          setUserProfile(null);
        }
        setLoading(false);
      }
    );

    // Then get initial session
    const getInitialSession = async () => {
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

    getInitialSession();

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
        console.log('User profile not found, creating default profile');
        // Create a default user profile if none exists
        const { data: newUser, error: createError } = await supabase
          .from('users')
          .insert({
            id: userId,
            email: email || '',
            name: email?.split('@')[0] || 'User',
            role: 'user',
            department: 'General',
            title: 'Staff Member'
          })
          .select()
          .single();

        if (createError) {
          console.error('Error creating user profile:', createError);
          toast.error("Error creating user profile. Please contact system administrator.");
        } else {
          setUserProfile({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role as 'superuser' | 'admin' | 'ict_officer' | 'user',
            department: newUser.department,
            title: newUser.title
          });
          toast.success("Welcome! Your profile has been created.");
        }
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      toast.error("Error loading user profile. Please try refreshing the page.");
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        throw error;
      }
      
      toast.success("Signed in successfully!");
    } catch (error: any) {
      console.error('Sign in error:', error);
      toast.error(error.message || "Failed to sign in");
      throw error;
    }
  };

  const signUp = async (email: string, password: string, metadata?: { name: string; department: string }) => {
    try {
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
      
      toast.success("Account created successfully! Please check your email to verify your account.");
    } catch (error: any) {
      console.error('Sign up error:', error);
      toast.error(error.message || "Failed to create account");
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
    console.log('Demo accounts should already exist in the database');
    toast.info("Demo accounts are already available in the system");
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
