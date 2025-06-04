
import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/sonner";
import { Eye, EyeOff, Shield, UserCheck, Crown, User, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const { signIn, signUp } = useAuth();

  const demoAccounts = [
    {
      email: 'demo.superuser@wajir.go.ke',
      name: 'Demo Super Administrator',
      role: 'superuser',
      icon: Crown,
      color: 'bg-red-600 hover:bg-red-700',
      description: 'Full system access & management'
    },
    {
      email: 'demo.admin@wajir.go.ke',
      name: 'Demo Administrator',
      role: 'admin',
      icon: Shield,
      color: 'bg-blue-600 hover:bg-blue-700',
      description: 'Department management & oversight'
    },
    {
      email: 'demo.user@wajir.go.ke',
      name: 'Demo User',
      role: 'user',
      icon: User,
      color: 'bg-gray-600 hover:bg-gray-700',
      description: 'Standard user access'
    }
  ];

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await signIn(email, password);
      toast.success("Signed in successfully!");
    } catch (error) {
      console.error('Sign in error:', error);
      toast.error(error instanceof Error ? error.message : "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await signUp(email, password, { name, department });
      toast.success("Account created successfully! Please check your email to verify your account.");
    } catch (error) {
      console.error('Sign up error:', error);
      toast.error(error instanceof Error ? error.message : "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/`,
      });
      
      if (error) throw error;
      
      toast.success("Password reset email sent! Please check your inbox.");
      setShowForgotPassword(false);
      setResetEmail("");
    } catch (error) {
      console.error('Password reset error:', error);
      toast.error(error instanceof Error ? error.message : "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail: string) => {
    setLoading(true);
    try {
      await signIn(demoEmail, 'Demo123!');
      toast.success(`Signed in as ${demoEmail}`);
    } catch (error) {
      console.error('Demo login error:', error);
      toast.error("Failed to sign in with demo account");
    } finally {
      setLoading(false);
    }
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-t-lg">
            <CardTitle className="text-xl text-center">Reset Password</CardTitle>
            <CardDescription className="text-blue-100 text-center">
              Enter your email to receive a password reset link
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reset-email">Email Address</Label>
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="your.email@wajir.go.ke"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                  className="h-12"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full h-12 bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setShowForgotPassword(false)}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
        {/* Government Branding Section */}
        <div className="space-y-8 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start space-x-4">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl animate-pulse"></div>
              <img 
                src="/lovable-uploads/60407c4d-d926-4d49-85c1-36e4af65d42b.png" 
                alt="Wajir County Logo" 
                className="relative h-20 w-20 drop-shadow-lg object-contain"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent">
                WAJIR COUNTY GOVERNMENT
              </h1>
              <p className="text-lg text-blue-800 font-semibold">ICT Department Help Desk System</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-800">Secure Access Portal</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Professional ICT support system designed for government efficiency and security. 
              Access technical assistance, submit service requests, and track resolution progress.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-blue-200">
              <h3 className="font-semibold text-blue-900">Secure Authentication</h3>
              <p className="text-sm text-slate-600">Government-grade security protocols</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-blue-200">
              <h3 className="font-semibold text-blue-900">24/7 Support</h3>
              <p className="text-sm text-slate-600">Round-the-clock technical assistance</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-blue-200">
              <h3 className="font-semibold text-blue-900">Digital Efficiency</h3>
              <p className="text-sm text-slate-600">Streamlined government operations</p>
            </div>
          </div>
        </div>

        {/* Authentication Section */}
        <div className="space-y-6">
          <Card className="card-professional shadow-2xl border-0">
            <CardHeader className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-t-lg">
              <CardTitle className="text-2xl text-center">System Access</CardTitle>
              <CardDescription className="text-blue-100 text-center">
                Sign in to access the ICT Help Desk System
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="signin" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                    Register
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="signin">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email" className="text-slate-700 font-medium">
                        Official Email Address
                      </Label>
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="your.name@wajir.go.ke"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-12 border-2 border-slate-300 focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signin-password" className="text-slate-700 font-medium">
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="signin-password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="h-12 border-2 border-slate-300 focus:border-blue-500 pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        variant="link"
                        className="text-blue-600 hover:text-blue-800 p-0 h-auto"
                        onClick={() => setShowForgotPassword(true)}
                      >
                        Forgot Password?
                      </Button>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full h-12 btn-professional text-lg font-semibold"
                      disabled={loading}
                    >
                      {loading ? "Authenticating..." : "Sign In Securely"}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-name" className="text-slate-700 font-medium">
                          Full Name
                        </Label>
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="Your full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="h-12 border-2 border-slate-300 focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-department" className="text-slate-700 font-medium">
                          Department
                        </Label>
                        <Input
                          id="signup-department"
                          type="text"
                          placeholder="Your department"
                          value={department}
                          onChange={(e) => setDepartment(e.target.value)}
                          required
                          className="h-12 border-2 border-slate-300 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-slate-700 font-medium">
                        Official Email Address
                      </Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="your.name@wajir.go.ke"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-12 border-2 border-slate-300 focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-slate-700 font-medium">
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="h-12 border-2 border-slate-300 focus:border-blue-500 pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full h-12 btn-professional text-lg font-semibold"
                      disabled={loading}
                    >
                      {loading ? "Creating Account..." : "Register Account"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Demo Accounts Section */}
          <Card className="card-professional shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-t-lg">
              <CardTitle className="text-xl text-center flex items-center justify-center gap-2">
                <UserCheck className="h-5 w-5" />
                Demo Access Accounts
              </CardTitle>
              <CardDescription className="text-slate-200 text-center">
                Click to instantly access with pre-configured demo accounts
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {demoAccounts.map((account) => {
                  const IconComponent = account.icon;
                  return (
                    <Button
                      key={account.email}
                      onClick={() => handleDemoLogin(account.email)}
                      disabled={loading}
                      variant="outline"
                      className={`w-full h-16 justify-start gap-4 border-2 hover:border-transparent transition-all duration-300 ${account.color} hover:text-white`}
                    >
                      <div className="flex items-center gap-4 w-full">
                        <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-semibold">{account.name}</div>
                          <div className="text-sm opacity-80">{account.description}</div>
                        </div>
                        <Badge variant="secondary" className="bg-white/20 text-current border-0">
                          {account.role.toUpperCase()}
                        </Badge>
                      </div>
                    </Button>
                  );
                })}
              </div>
              
              <Separator className="my-4" />
              
              <div className="text-center space-y-2">
                <p className="text-sm text-slate-600 font-medium">Demo Account Credentials</p>
                <div className="bg-slate-100 p-3 rounded-lg">
                  <p className="text-sm font-mono text-slate-800">Password: <strong>Demo123!</strong></p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
