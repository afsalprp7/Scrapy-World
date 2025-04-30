"use client"
import HomeContent from "@/components/HomeContent/HomeContent";
import Navbar from "@/components/Navbar/Navbar";
import { motion } from "framer-motion";


export default function Home(){
    return (
        <motion.div className="min-h-screen w-full"
        animate={{ opacity: 1, y: 0 }}
    initial={{ opacity: 0, y: 50 }}
    transition={{ duration: 0.6, ease: "easeIn" }}
        >
        <Navbar/>
        <HomeContent/>
        </motion.div>
    )
}