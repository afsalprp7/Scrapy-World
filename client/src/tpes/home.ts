import { StaticImageData } from "next/image"
import { JSX } from "react"

export type homeSectionContent = {
    type : string,
    heading : string,
    description : string
    image : StaticImageData
}

export type navbarSheetContent = {
    heading : string ,
    content : ()=> JSX.Element
}