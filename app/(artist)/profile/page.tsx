"use client";

import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Upload } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProfileSection() {
      // PROFILE STATES
      const [artistName, setArtistName] = useState("");
      const [bio, setBio] = useState("");
      const [tagline, setTagline] = useState("");
      const [avatarPic, setAvatarPic] = useState("");

      useEffect(() => {
        const loadData = async () => {
          try {
            const { data, error } = await supabase
              .from("profiles")
              .select("*")
              .single();
            if (error) {
              console.error(error);
              return;
            }
            if (!data) {
              alert("No data");
              return;
            }

            setArtistName(data.name);
            setBio(data.bio);
            setTagline(data.tagline);
          } catch (error) {
            console.error(error);
          }
        };
        loadData();
      }, []);

      const handleSaveProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Get the one existing profile
        const { data: profiles, error: fetchError } = await supabase
          .from("profiles")
          .select("*")
          .limit(1);

        if (fetchError) {
          console.error(fetchError);
          return;
        }

        if (!profiles || profiles.length === 0) {
          alert("No profile found.");
          return;
        }

        const profileId = profiles[0].id;

        // Update that profile
        const { data, error } = await supabase
          .from("profiles")
          .update({
            name: artistName,
            bio: bio,
            tagline: tagline,
          })
          .eq("id", profileId)
          .select();

        if (error) {
          console.error("Saving failed:", error);
          alert("Saving failed");
          return;
        }

        console.log("Updated:", data);
        alert("Profile saved successfully");
      };
    return(
         <Card className="rounded-[2rem] border-sky-100 bg-white shadow-lg shadow-sky-100/60 max-w-screen">
                      <CardHeader>
                        <CardTitle className="text-xl text-slate-800">
                          Profile Settings
                        </CardTitle>
                        <p className="text-sm text-slate-500">
                          Update your public artist profile.
                        </p>
                      </CardHeader>
                      <CardContent className="space-y-5">
                        <div className="flex items-center gap-4">
                          <img
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop"
                            alt="Artist avatar"
                            loading="lazy"
                            className="h-20 w-20 rounded-full border-4 border-sky-100 object-cover shadow-sm"
                          />
                          <Button
                            variant="outline"
                            className="rounded-2xl border-sky-100 bg-sky-50 text-sky-700 hover:bg-sky-100"
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Avatar
                          </Button>
                        </div>
                        <form onSubmit={handleSaveProfile}>
                          <label className="block">
                            <span className="text-sm font-medium text-slate-600">
                              Artist Name
                            </span>
                            <input
                              className="mt-2 w-full rounded-2xl border border-sky-100 bg-[#F7FBFF] px-4 py-3 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
                              value={artistName}
                              onChange={(e) => setArtistName(e.target.value)}
                            />
                          </label>

                          <label className="block">
                            <span className="text-sm font-medium text-slate-600">
                              Tagline
                            </span>
                            <input
                              className="mt-2 w-full rounded-2xl border border-sky-100 bg-[#F7FBFF] px-4 py-3 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
                              value={tagline}
                              onChange={(e) => setTagline(e.target.value)}
                            />
                          </label>

                          <label className="block">
                            <span className="text-sm font-medium text-slate-600">
                              Bio
                            </span>
                            <textarea
                              className="mt-2 min-h-28 w-full rounded-2xl border border-sky-100 bg-[#F7FBFF] px-4 py-3 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
                              value={bio}
                              onChange={(e) => setBio(e.target.value)}
                            />
                          </label>

                          <Button
                            type="submit"
                            className="w-full rounded-2xl bg-sky-400 py-6 text-white shadow-lg shadow-sky-200 hover:bg-sky-500"
                          >
                            <Save className="mr-2 h-4 w-4" />
                            Save Profile
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
    );
}
