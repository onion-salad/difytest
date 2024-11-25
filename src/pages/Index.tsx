import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleClick = async () => {
    setIsLoading(true);
    try {
      console.log("Sending request to Dify API...");
      const response = await fetch(import.meta.env.VITE_DIFY_API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_DIFY_API_KEY}`
        },
        body: JSON.stringify({
          inputs: {},
          response_mode: "blocking",
          user: "user-1"
        })
      });

      const data = await response.json();
      console.log("API Response:", data);
      
      if (!response.ok) {
        throw new Error(`API returned status ${response.status}: ${JSON.stringify(data)}`);
      }

      if (data.data?.outputs?.output) {
        toast({
          title: "Success",
          description: data.data.outputs.output,
        });
      } else {
        console.error("Unexpected response format:", data);
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Error details:", error);
      toast({
        title: "Error",
        description: "APIの呼び出しに失敗しました",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <Button
        onClick={handleClick}
        disabled={isLoading}
        className="px-8 py-6 text-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95"
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          "Click me"
        )}
      </Button>
    </div>
  );
};

export default Index;