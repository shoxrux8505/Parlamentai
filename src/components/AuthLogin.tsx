import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Eye, EyeOff, Shield, Building2, ArrowLeft } from "lucide-react";

export function AuthLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", formData);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Mobile Header with Status Bar Space */}
      <div className="pt-12 pb-6 px-6">
        <div className="flex items-center justify-start mb-8">
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Button>
        </div>

        {/* Title Section */}
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold text-gray-900">
            Welcome to
            <br />
            <span className="text-primary">PARLAMENT AI</span>
          </h1>
          <p className="text-lg text-gray-600">
            Secure access to government services
          </p>
        </div>
      </div>

      {/* Form Container */}
      <div className="flex-1 bg-gray-50 rounded-t-3xl px-6 pt-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="space-y-3">
            <Label htmlFor="email" className="text-base text-gray-700 font-medium">
              Email Address
            </Label>
            <div className="relative">
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your government email"
                value={formData.email}
                onChange={handleInputChange}
                className="h-14 text-base bg-white border-2 border-gray-200 rounded-2xl focus:border-primary focus:ring-0 px-4"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-3">
            <Label htmlFor="password" className="text-base text-gray-700 font-medium">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                className="h-14 text-base bg-white border-2 border-gray-200 rounded-2xl focus:border-primary focus:ring-0 px-4 pr-14"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="remember"
                checked={formData.rememberMe}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, rememberMe: checked as boolean }))
                }
                className="w-5 h-5 rounded border-2 border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label htmlFor="remember" className="text-base text-gray-600 font-normal">
                Remember me
              </Label>
            </div>
            <Button
              type="button"
              variant="link"
              className="text-base text-primary hover:text-primary/80 p-0 h-auto font-medium"
            >
              Forgot password?
            </Button>
          </div>

          {/* Login Button */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full h-14 text-base font-semibold bg-primary hover:bg-primary/90 text-white rounded-2xl"
            >
              Sign In
            </Button>
          </div>

          {/* Alternative Sign In */}
          <div className="pt-8 pb-4">
            <div className="text-center text-base text-gray-500 mb-6">
              Or continue with
            </div>
            <div className="flex justify-center space-x-6">
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-14 rounded-2xl border-2 border-gray-200 hover:border-primary hover:bg-primary/5 flex items-center justify-center space-x-2"
              >
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-gray-700">OneID</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-14 rounded-2xl border-2 border-gray-200 hover:border-red-500 hover:bg-red-50 flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-sm font-medium text-gray-700">Google</span>
              </Button>
            </div>
          </div>
        </form>

        {/* Bottom Spacing for Safe Area */}
        <div className="h-8"></div>
      </div>
    </div>
  );
}