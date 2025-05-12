import { useState } from "react"
import { useAuthStore } from "../store/useAuthStore"
import { Camera, Mail, User, Trash2 } from "lucide-react"

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore()
  const [selectedImg, setSelectedImg] = useState(null)

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = async () => {
      const base64Image = reader.result
      setSelectedImg(base64Image)
      await updateProfile({ profilePic: base64Image })
    }
  }

  const handleImageDelete = () => {
    setSelectedImg(null)
    updateProfile({ profilePic: "" })
  }

  const profileInputs = [
    {
      lucideIcon: <User className="size-4" />,
      label: "Full Name",
      userContent: authUser?.fullName,
    },
    {
      lucideIcon: <Mail className="size-4" />,
      label: "Email Address",
      userContent: authUser?.email,
    },
  ]

  const displayProfileInputs = profileInputs.map(
    ({ lucideIcon, label, userContent }) => (
      <div
        className="space-y-1.5"
        key={label}
      >
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          {lucideIcon}
          {label}
        </div>
        <p className="rounded-lg border bg-base-200 px-4 py-2.5">
          {userContent}
        </p>
      </div>
    )
  )

  return (
    <div className="h-screen pt-20">
      <div className="mx-auto max-w-2xl p-4 py-8">
        <div className="space-y-8 rounded-xl bg-base-300 p-6">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* avatar upload section */}

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full border-4 object-cover"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute right-0 bottom-0 cursor-pointer rounded-full bg-base-content p-2 transition-all duration-200 hover:scale-105 ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <Camera className="size-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
              {authUser.profilePic && (
                <button
                  onClick={handleImageDelete}
                  className={`absolute top-0 right-0 cursor-pointer rounded-full bg-red-500 p-2 transition-all duration-200 hover:scale-105 ${
                    isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                  }`}
                  disabled={isUpdatingProfile}
                >
                  <Trash2 className="size-5 text-base-200 stroke-white" />
                </button>
              )}
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">{displayProfileInputs}</div>

          <div className="mt-6 rounded-xl bg-base-300 p-6">
            <h2 className="mb-4 text-lg  font-medium">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between border-b border-zinc-700 py-2">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProfilePage
