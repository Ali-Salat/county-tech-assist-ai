
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { departments } from '@/data/mockData';
import { Shield, Lock, Users, Computer, Eye, EyeOff, Info } from 'lucide-react';

export function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signIn, signUp, createDemoAccounts } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  });

  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    department: '',
  });

  const validatePassword = (password: string): string[] => {
    const errors = [];
    if (password.length < 8) errors.push('At least 8 characters long');
    if (!/[A-Z]/.test(password)) errors.push('At least one uppercase letter');
    if (!/[a-z]/.test(password)) errors.push('At least one lowercase letter');
    if (!/\d/.test(password)) errors.push('At least one number');
    if (!/[!@#$%^&*]/.test(password)) errors.push('At least one special character (!@#$%^&*)');
    return errors;
  };

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
    
    if (!signUpData.email || !signUpData.password || !signUpData.confirmPassword || !signUpData.name || !signUpData.department) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      toast({
        title: 'Password Mismatch',
        description: 'Passwords do not match. Please try again.',
        variant: 'destructive',
      });
      return;
    }

    const passwordErrors = validatePassword(signUpData.password);
    if (passwordErrors.length > 0) {
      toast({
        title: 'Password Requirements',
        description: `Password must meet the following requirements: ${passwordErrors.join(', ')}`,
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

  const handleCreateDemoAccounts = async () => {
    setIsLoading(true);
    try {
      await createDemoAccounts();
      toast({
        title: 'Demo accounts created!',
        description: 'You can now use the demo credentials to test different user roles.',
      });
    } catch (error) {
      toast({
        title: 'Demo setup failed',
        description: 'Some demo accounts might already exist.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 p-4">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative z-10 w-full max-w-7xl flex items-center justify-between gap-16">
        {/* Left side - Branding */}
        <div className="hidden lg:flex flex-col items-start text-left space-y-8 flex-1 max-w-2xl">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
              <img 
                src="/lovable-uploads/825a277b-660c-4190-99eb-c75e7362dbea.png" 
                alt="Wajir County Logo" 
                className="relative h-20 w-20 drop-shadow-xl"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white leading-tight">
                Wajir County
              </h1>
              <p className="text-xl font-semibold text-primary">ICT Help Desk System</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300">
              Professional ICT Support Services
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Comprehensive technical support platform designed for county government employees. 
              Streamlined ticket management, real-time assistance, and expert ICT solutions 
              to ensure operational excellence across all departments.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="flex items-center space-x-3 p-4 bg-white/80 dark:bg-slate-800/80 rounded-xl backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
              <Shield className="h-8 w-8 text-green-600" />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Secure Platform</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Enterprise-grade security</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-white/80 dark:bg-slate-800/80 rounded-xl backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
              <Computer className="h-8 w-8 text-blue-600" />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Expert Support</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Professional ICT team</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-white/80 dark:bg-slate-800/80 rounded-xl backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
              <Users className="h-8 w-8 text-purple-600" />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Team Collaboration</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Seamless workflow</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-white/80 dark:bg-slate-800/80 rounded-xl backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
              <Lock className="h-8 w-8 text-red-600" />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Data Protection</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">GDPR compliant</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Auth Form */}
        <div className="w-full max-w-md lg:max-w-lg">
          <Card className="shadow-2xl border-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm">
            <CardHeader className="text-center space-y-4 pb-6">
              <div className="flex justify-center lg:hidden mb-4">
                <img 
                  src="/lovable-uploads/825a277b-660c-4190-99eb-c75e7362dbea.png" 
                  alt="Wajir County Logo" 
                  className="h-16 w-16"
                />
              </div>
              <CardTitle className="text-2xl font-bold">Access Your Account</CardTitle>
              <CardDescription className="text-base">
                Sign in to your account or create a new one to access the ICT Help Desk
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="signin" className="font-medium">Sign In</TabsTrigger>
                  <TabsTrigger value="signup" className="font-medium">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="signin" className="space-y-6">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email" className="text-sm font-medium">Email Address</Label>
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="your.email@wajir.go.ke"
                        value={signInData.email}
                        onChange={(e) => setSignInData(prev => ({ ...prev, email: e.target.value }))}
                        className="h-11"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signin-password" className="text-sm font-medium">Password</Label>
                      <div className="relative">
                        <Input
                          id="signin-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={signInData.password}
                          onChange={(e) => setSignInData(prev => ({ ...prev, password: e.target.value }))}
                          className="h-11 pr-10"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-11 w-10"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <Button type="submit" className="w-full h-11 font-medium" disabled={isLoading}>
                      {isLoading ? 'Signing in...' : 'Sign In'}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup" className="space-y-6">
                  <form onSubmit={handleSignUp} className="space-y-4">
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
                      <Label htmlFor="signup-department" className="text-sm font-medium">Department</Label>
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
                      <div className="relative">
                        <Input
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          value={signUpData.password}
                          onChange={(e) => setSignUpData(prev => ({ ...prev, password: e.target.value }))}
                          className="h-11 pr-10"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-11 w-10"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password" className="text-sm font-medium">Confirm Password</Label>
                      <div className="relative">
                        <Input
                          id="confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={signUpData.confirmPassword}
                          onChange={(e) => setSignUpData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          className="h-11 pr-10"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-11 w-10"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p className="font-medium">Password Requirements:</p>
                      <ul className="space-y-1 pl-4">
                        <li>• At least 8 characters long</li>
                        <li>• One uppercase and lowercase letter</li>
                        <li>• One number and special character</li>
                      </ul>
                    </div>
                    <Button type="submit" className="w-full h-11 font-medium" disabled={isLoading}>
                      {isLoading ? 'Creating account...' : 'Create Account'}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
              
              <div className="border-t pt-6">
                <Alert className="mb-4">
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Demo Accounts Available:</strong> Click below to create test accounts for different user roles.
                  </AlertDescription>
                </Alert>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={handleCreateDemoAccounts}
                  disabled={isLoading}
                >
                  Create Demo Accounts
                </Button>
                <div className="mt-4 text-xs text-muted-foreground space-y-2">
                  <div className="grid grid-cols-1 gap-2">
                    <div><strong>Director ICT:</strong> director@wajir.go.ke / Demo123!</div>
                    <div><strong>Senior ICT Officer:</strong> ali.salat@wajir.go.ke / Demo123!</div>
                    <div><strong>ICT Officer:</strong> ict.officer1@wajir.go.ke / Demo123!</div>
                    <div><strong>Regular User:</strong> user.demo@wajir.go.ke / Demo123!</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              By signing in, you agree to our terms of service and privacy policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
