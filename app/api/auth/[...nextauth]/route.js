import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import AzureADProvider from "next-auth/providers/azure-ad";
import User from "@/models/user"
import { connectToDB } from "../../../../utils/database";
import GitHubProvider from "next-auth/providers/github";
import { GithubEmail } from "next-auth/providers/github";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        // AzureADProvider({
        //     clientId: process.env.AZURE_AD_CLIENT_ID,
        //     clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
        //     tenantId: process.env.AZURE_AD_TENANT_ID,
        //   }),
          GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
          })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({ email: session.user.email });
            session.user.id = sessionUser._id.toString();
            return session;
        },
        async signIn({ account, profile, user, credentials }) {
            try {
                await connectToDB();
                //console.log("Profile!is here", profile)
                //console.log("Account!is here", account)
                //console.log("User!is here", user)
                //console.log("Credentials!is here", credentials)

                const userExisis = await User.findOne({ email: profile.email });
                if (account.provider === "google") {
                    if (!userExisis) {
                        await new User({
                            email: profile.email,
                            username: profile.login,
                            image: profile.picture
                        }).save();
                    }
                    return true;
                }

                // else if(account.provider==="azure-ad"){
                //     if (!userExisis) {
                //         await new User({
                //             email: profile.email,
                //             username: profile.login,
                //             image: profile.picture
                //         }).save();
                //     }
                //     return true;
                // }
                else if(account.provider==="github"){
                    // //console.log(profile);
                    if (!profile.email) { 
                        const emails = await ( 
                          await fetch("https://api.github.com/user/emails", { 
                            headers: { Authorization: `token ${account.access_token}` ,
                            // emails:"read",
                            // 'X-GitHub-Api-Version': '2022-11-28'

                        }, 
                          }) 
                        ).json() 
                        //console.log(account.access_token,"llll",emails,"guyguvuv")
                       
                        if (emails?.length > 0) { 
                          // Get primary email 
                          profile.email = emails.find((email) => email.primary)?.email 
                          // And if for some reason it doesn't exist, just use the first 
                          if (!profile.email) profile.email = emails[0].email 
                        } 
                      } 
                    if (!userExisis) {
                        await new User({
                            email: profile.email,
                            username: profile.login,
                            image: profile.avatar_url
                        }).save();
                    }
                    return true;
                }
            }
            catch (error) {
                // //console.log(error, "error in route main google signin")
                return false;
            }
        }
    }
})
export { handler as GET, handler as POST }