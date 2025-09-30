import { Link } from "react-router";
import { CheckSquare, Plus, List, ArrowRight } from "lucide-react";
import { Button } from "~/components/ui/Button";

export default function Welcome() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-6 border border-white/20">
              <CheckSquare size={64} className="text-white" />
            </div>
          </div>

          <h1 className="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200 bg-clip-text text-transparent">
            Welcome to TodoApp
          </h1>

          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Organize your life with our beautiful and intuitive todo
            application. Keep track of your tasks, mark them as complete, and
            stay productive every day.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="bg-blue-500/20 rounded-full p-3 w-fit mx-auto mb-4">
              <Plus size={32} className="text-blue-300" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Add Tasks</h3>
            <p className="text-white/70">
              Quickly add new tasks and organize your daily activities with
              ease.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="bg-green-500/20 rounded-full p-3 w-fit mx-auto mb-4">
              <CheckSquare size={32} className="text-green-300" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Track Progress
            </h3>
            <p className="text-white/70">
              Mark tasks as complete and watch your productivity soar.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="bg-purple-500/20 rounded-full p-3 w-fit mx-auto mb-4">
              <List size={32} className="text-purple-300" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Stay Organized
            </h3>
            <p className="text-white/70">
              Keep all your tasks in one place with our clean, intuitive
              interface.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Link
            to="/home"
            // className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Button className="inline-flex items-center gap-3">
              Get Started
              <ArrowRight size={20} />
            </Button>
          </Link>
          <div className="text-white/60 text-sm">
            Start organizing your tasks today • Free to use
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">∞</div>
            <div className="text-white/70">Unlimited Tasks</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">⚡</div>
            <div className="text-white/70">Lightning Fast</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">🎨</div>
            <div className="text-white/70">Beautiful Design</div>
          </div>
        </div>
      </div>
    </div>
  );
}
