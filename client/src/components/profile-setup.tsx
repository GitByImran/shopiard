"use client";

import {
  BadgeCheck,
  Check,
  CheckCheck,
  ImageUp,
  Mail,
  PenLine,
  ShieldCheck,
  X,
} from "lucide-react";
import React, { useState, ChangeEvent } from "react";
import LoadingButton from "./loading-button";
import uploadImageToImgBB from "@/lib/imageUploader";
import { useRouter } from "next/navigation";

interface UserProfile {
  name: string;
  email: string;
  image: string;
  isAdmin: boolean;
}

const ProfileSetup = ({ session }: any) => {
  if (!session || !session.user) {
    return (
      <div>
        <LoadingButton />
      </div>
    );
  }
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [updatedName, setUpdatedName] = useState<string>("");
  const [updatedEmail, setUpdatedEmail] = useState<string>("");
  const [editMode, setEditMode] = useState<boolean>(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const imageUrl = URL.createObjectURL(file);
      setSelectedImageUrl(imageUrl);
    }
  };
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdatedName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdatedEmail(e.target.value);
  };

  const handleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleUpdateUser = async (e: any) => {
    e.preventDefault();

    try {
      let imageUrl = session.user.image;
      if (selectedImage) {
        imageUrl = await uploadImageToImgBB(selectedImage);
      }

      const updatedUserData = {
        name: updatedName !== "" ? updatedName : session.user.name,
        email: updatedEmail !== "" ? updatedEmail : session.user.email,
        image: imageUrl,
      };

      const response = await fetch(
        `/api/database/user?email=${session.user.email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUserData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user information");
      }

      // verify user again
      router.push("/signin");

      setEditMode(false);
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };

  return (
    <div>
      {session ? (
        editMode ? (
          <form className="border p-5 flex flex-col sm:flex-row items-center gap-5 relative">
            <div className="relative w-[80px] h-[80px] rounded-full overflow-hidden">
              <input
                type="file"
                id="profile"
                className="hidden"
                onChange={handleImageChange}
              />
              <label htmlFor="profile" className="cursor-pointer">
                <img
                  src={
                    selectedImageUrl ||
                    session.user.image ||
                    "/dummy-avatar.png"
                  }
                  alt="user profile"
                  className="w-full h-full object-cover object-top"
                />
                <p className="absolute top-0 left-0 h-full w-full flex items-center justify-center bg-black/50 text-white">
                  <ImageUp />
                </p>
              </label>
            </div>
            <div className="flex flex-col items-start gap-2">
              <input
                type="text"
                className="sm:w-fit sm:m-0 w-full mx-auto text-sm border py-1 px-2 text-slate-800"
                placeholder={session.user.name}
                onChange={handleNameChange}
              />
              <input
                type="email"
                className="sm:w-fit sm:m-0 w-full mx-auto text-sm border py-1 px-2 text-slate-800"
                placeholder={session.user.email}
                onChange={handleImageChange}
              />
              <p className="text-xs">
                * If you change your email once, you have to login with new
                email.
              </p>
            </div>

            <div className="absolute top-2 right-2 flex items-center gap-2">
              <button
                className="p-1 lg:px-2 border rounded bg-white text-black font-semibold hover:bg-gray-100 hover:shadow flex items-center gap-1"
                type="submit"
                onClick={handleUpdateUser}
              >
                <Check size={18} />
                <span className="hidden lg:block">Save</span>
              </button>
              <button
                className="p-1 lg:px-2 border rounded bg-white text-black font-semibold hover:bg-gray-100 hover:shadow flex items-center gap-1"
                onClick={handleEditMode}
              >
                <X size={18} />
                <span className="hidden lg:block">Cancel</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="border p-5 flex sm:flex-row flex-col items-center gap-5 relative">
            <div className="max-w-[80px] max-h-[80px] rounded-full overflow-hidden border-2">
              <img
                src={
                  session.user.image ? session.user.image : "/dummy-avatar.png"
                }
                alt="user profile"
                className="w-full h-full object-center"
              />
            </div>
            <div className="flex flex-col items-center sm:block">
              <h2 className="font-bold mb-2">{session.user.name}</h2>
              <p className="text-sm font-semibold text-slate-600 flex items-center gap-1">
                {session.user.isAdmin ? (
                  <>
                    <ShieldCheck size={16} />
                    Admin
                  </>
                ) : (
                  <>
                    <BadgeCheck size={16} />
                    User
                  </>
                )}
              </p>
              <p className="text-sm font-semibold text-slate-600 flex items-center gap-1">
                <Mail size={16} />
                {session.user.email}
              </p>
            </div>
            <button
              className="absolute top-2 right-2 p-1 sm:py-1 sm:px-4 border rounded bg-white text-black font-semibold hover:bg-gray-100 hover:shadow flex items-center gap-1"
              title="Edit Profile"
              onClick={handleEditMode}
            >
              <PenLine size={16} />{" "}
              <span className="hidden md:block">Edit Profile</span>
            </button>
          </div>
        )
      ) : (
        <>
          Searching user data <LoadingButton />
        </>
      )}
    </div>
  );
};

export default ProfileSetup;
