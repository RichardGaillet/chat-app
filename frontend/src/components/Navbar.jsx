import { Link } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"
import { LogOut, MessageSquare, Settings, User } from "lucide-react"

const Navbar = () => {
  const { logout, authUser } = useAuthStore()

  return (
    <header className="border-base-300 bg-base-100 fixed top-0 z-40 w-full border-b backdrop-blur-lg">
      <div className="container mx-auto h-16 px-4">
        <div className="flex h-full items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 transition-all hover:opacity-80"
            >
              <div className="bg-primary/10 flex size-9 items-center justify-center rounded-lg">
                <MessageSquare className="text-primary size-5" />
              </div>
              <h1 className="text-lg font-bold">Chatty</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className={`btn btn-sm gap-2 transition-colors`}
            >
              <Settings className="size-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link
                  to={"/profile"}
                  className={`btn btn-sm gap-2`}
                >
                  {authUser.profilePic ? (
                    <img
                      src={authUser.profilePic}
                      alt=""
                      className="size-5 rounded-full"
                    />
                  ) : (
                    <User className="size-5" />
                  )}
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button
                  className="flex items-center gap-2"
                  onClick={logout}
                >
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
export default Navbar
