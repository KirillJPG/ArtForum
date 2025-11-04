import { useEffect } from "react"
import { useStore } from "../header"
import styles from "./Hero.module.css"
import { Container } from "@/shared/ui/Container/Container"
import { Button } from "@/shared/ui/Button/Button"
import clsx from "clsx"
import { Link } from "react-router"
import { ROUTES } from "@/shared/model/routes"

export function Hero(){
    const {setVariant}= useStore()
    useEffect(()=>{
        setVariant("light")
    })
    return(
        <div className="overflow-hidden relative h-[700px]">
            <BackgroundHero/>
            <Container>
                <div className="grid grid-cols-2 h-full items-center relative">
                    <div className="">
                        <div className="text-white text-5xl pb-4">This Website is a Digital Canvas</div>
                        <div className="text-white60 text-2xl pb-4">Paint your digital masterpiece. One pixel, one block, one idea at a time.</div>
                        <Link to={ROUTES["CREATE"]}><Button variant="primary" size={"large"}>Create</Button></Link>
                    </div>
                    <div className="grid justify-items-center">
                        <img src="/public/arts/black-hole.png" className={clsx(styles.art,"w-full")}/>
                    </div>
                </div>
            </Container>
        </div>
    )
}


function BackgroundHero(){
    return (
        <div className="absolute w-full h-full brightness-[0.30]">
            <img src="/public/arts/bg.jpg" className={styles.bg}/>
        </div>
    )
}