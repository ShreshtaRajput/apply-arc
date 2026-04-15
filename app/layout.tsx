import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit, DM_Sans } from "next/font/google";
import { AuthProvider } from "@/lib/AuthContext";
import { ReduxProvider } from "@/lib/ReduxProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

// const syne = Syne({
//   variable: "--font-syne",
//   subsets: ["latin"],
//   weight: ["400", "500", "700", "800"],
// });

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "ApplyArc",
  description: "Track every app. Land your role.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // Added all variable definitions to the HTML tag
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} ${dmSans.variable} h-full antialiased`}
    >
      {/* By default, we set the body to use the Geist Sans font. 
        You can use font-heading (Outfit) for big titles and font-body (DM Sans) for text!
      */}
      <body className="min-h-full flex flex-col font-sans">
        <AuthProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

// import type { Metadata } from "next";
// import { Geist, Geist_Mono, Syne, DM_Sans } from "next/font/google";
// import { AuthProvider } from "@/lib/AuthContext";
// import { ReduxProvider } from "@/lib/ReduxProvider";
// import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// const syne = Syne({
//   variable: "--font-syne",
//   subsets: ["latin"],
//   weight: ["400", "500", "700", "800"],
// });

// const dmSans = DM_Sans({
//   variable: "--font-dm-sans",
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600"],
// });

// export const metadata: Metadata = {
//   title: "ApplyArc",
//   description: "Track every app. Land your role.",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html
//       lang="en"
//       className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} ${dmSans.variable} h-full antialiased`}
//     >
//       <body className="min-h-full flex flex-col">
//         <AuthProvider>
//           <ReduxProvider>{children}</ReduxProvider>
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }

// // import type { Metadata } from "next";
// // import { Geist, Geist_Mono } from "next/font/google";
// // import { AuthProvider } from "@/lib/AuthContext";
// // import { ReduxProvider } from "@/lib/ReduxProvider";
// // import "./globals.css";

// // const geistSans = Geist({
// //   variable: "--font-geist-sans",
// //   subsets: ["latin"],
// // });

// // const geistMono = Geist_Mono({
// //   variable: "--font-geist-mono",
// //   subsets: ["latin"],
// // });

// // export const metadata: Metadata = {
// //   title: "ApplyArc",
// //   description: "Track every app. Land your role.",
// // };

// // export default function RootLayout({
// //   children,
// // }: Readonly<{
// //   children: React.ReactNode;
// // }>) {
// //   return (
// //     <html
// //       lang="en"
// //       className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
// //     >
// //       <body className="min-h-full flex flex-col">
// //         <AuthProvider>
// //           <ReduxProvider>{children}</ReduxProvider>
// //         </AuthProvider>
// //       </body>
// //     </html>
// //   );
// // }
