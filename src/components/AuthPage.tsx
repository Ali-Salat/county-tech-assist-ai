
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { departments } from '@/data/mockData';
import { Shield, Lock, Users, Computer } from 'lucide-react';

export function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  });

  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    name: '',
    department: '',
  });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInData.email || !signInData.password) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await signIn(signInData.email, signInData.password);
      toast({
        title: 'Welcome back!',
        description: 'You have been signed in successfully.',
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: 'Sign in failed',
        description: error.message || 'Please check your credentials and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpData.email || !signUpData.password || !signUpData.name || !signUpData.department) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }
    
    if (signUpData.password.length < 6) {
      toast({
        title: 'Password too short',
        description: 'Password must be at least 6 characters long.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await signUp(signUpData.email, signUpData.password, {
        name: signUpData.name,
        department: signUpData.department,
      });
      toast({
        title: 'Account created!',
        description: 'Please check your email to verify your account.',
      });
    } catch (error: any) {
      toast({
        title: 'Sign up failed',
        description: error.message || 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 p-4">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative z-10 w-full max-w-6xl flex items-center justify-center gap-12">
        {/* Left side - Branding */}
        <div className="hidden lg:flex flex-col items-center text-center space-y-8 flex-1">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
            <img 
              src="/lovable-uploads/825a277b-660c-4190-99eb-c75e7362dbea.png" 
              alt="Wajir County Logo" 
              className="relative h-32 w-32 drop-shadow-2xl"
            />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-primary leading-tight">
              Wajir County
              <br />
              <span className="text-3xl font-semibold text-muted-foreground">ICT Help Desk</span>
            </h1>
            <p className="text-xl text-muted-foreground font-bold">County Government of Wajir</p>
            <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
              Professional ICT support services for county government employees. 
              Secure, efficient, and reliable technical assistance.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="flex flex-col items-center space-y-2 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-sm font-medium">Secure Access</span>
            </div>
            <div className="flex flex-col items-center space-y-2 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
              <Computer className="h-8 w-8 text-primary" />
              <span className="text-sm font-medium">ICT Support</span>
            </div>
            <div className="flex flex-col items-center space-y-2 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
              <Users className="h-8 w-8 text-primary" />
              <span className="text-sm font-medium">Team Collaboration</span>
            </div>
            <div className="flex flex-col items-center space-y-2 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
              <Lock className="h-8 w-8 text-primary" />
              <span className="text-sm font-medium">Data Protection</span>
            </div>
          </div>
        </div>

        {/* Right side - Auth Form */}
        <div className="w-full max-w-md">
          <Card className="shadow-2xl border-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
            <CardHeader className="text-center space-y-4 pb-8">
              <div className="flex justify-center lg:hidden mb-4">
                <img 
                  src="/lovable-uploads/825a277b-660c-4190-99eb-c75e7362dbea.png" 
                  alt="Wajir County Logo" 
                  className="h-16 w-16"
                />
              </div>
              <CardTitle className="text-2xl font-bold">Welcome</CardTitle>
              <CardDescription className="text-base">
                Sign in to your account or create a new one to access the ICT Help Desk
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="signin" className="font-medium">Sign In</TabsTrigger>
                  <TabsTrigger value="signup" className="font-medium">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="signin">
                  <form onSubmit={handleSignIn} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@wajir.go.ke"
                        value={signInData.email}
                        onChange={(e) => setSignInData(prev => ({ ...prev, email: e.target.value }))}
                        className="h-11"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={signInData.password}
                        onChange={(e) => setSignInData(prev => ({ ...prev, password: e.target.value }))}
                        className="h-11"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full h-11 font-medium" disabled={isLoading}>
                      {isLoading ? 'Signing in...' : 'Sign In'}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup">
                  <form onSubmit={handleSignUp} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name" className="text-sm font-medium">Full Name</Label>
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Your full name"
                        value={signUpData.name}
                        onChange={(e) => setSignUpData(prev => ({ ...prev, name: e.target.value }))}
                        className="h-11"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-sm font-medium">Email Address</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="your.email@wajir.go.ke"
                        value={signUpData.email}
                        onChange={(e) => setSignUpData(prev => ({ ...prev, email: e.target.value }))}
                        className="h-11"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department" className="text-sm font-medium">Department</Label>
                      <Select value={signUpData.department} onValueChange={(value) => setSignUpData(prev => ({ ...prev, department: value }))}>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select your department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-sm font-medium">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Create a strong password"
                        value={signUpData.password}
                        onChange={(e) => setSignUpData(prev => ({ ...prev, password: e.target.value }))}
                        className="h-11"
                        required
                        minLength={6}
                      />
                      <p className="text-xs text-muted-foreground">Password must be at least 6 characters long</p>
                    </div>
                    <Button type="submit" className="w-full h-11 font-medium" disabled={isLoading}>
                      {isLoading ? 'Creating account...' : 'Create Account'}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              By signing in, you agree to our terms and privacy policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
