import { v4 as uuidv4 } from 'uuid';
import Video from '../components/Video'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../components/ui/carousel"

export default function Landing() {
    const videos = [
        { title: "fantastic videos", url: "https://cdn.higgsfield.ai/card/35e9552c-79a9-4f20-9bce-f9ee3b7aed7e.mp4" },
        { title: "Amazing video", url: "https://cdn.higgsfield.ai/card/e74330e3-39d7-470b-817a-483cce45c255.mp4" },
        { title: "fancy video", url: "https://cdn.higgsfield.ai/card/b462fc7c-f892-4f8e-951d-b8bf2884f60d.mp4" },
        { title: "build a fancy vido", url: "https://cdn.higgsfield.ai/card/7d948d7b-43e8-4fce-b8e6-8557c84075a5.mp4" },
        { title: "Fancy video nice", url: "https://cdn.higgsfield.ai/card/7f5704c9-77bd-416a-8d7f-8f7e8baf6a21.mp4" },
        { title: "make ai vidoe", url: "https://cdn.higgsfield.ai/card/447168a3-3ac0-470c-bedc-2ab74f96ffd1.mp4" },
        { title: "Beautiful video", url: "https://cdn.higgsfield.ai/card/ab3ecfdf-43b1-40e9-9408-2d47ad640c36.mp4" },
        { title: "greate video", url: "https://cdn.higgsfield.ai/card/b18c39ef-ecde-4633-97aa-130767bae4de.mp4" },
    ]

    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-black px-4 py-6">
            <Carousel
                opts={{ align: "start", loop: true }}
                className=" w-full"
            >
                <CarouselContent className="-ml-2">
                    {videos.map((video) => (
                        <CarouselItem
                            key={uuidv4()}
                            className="basis-full pl-3 sm:basis-1/2 md:basis-1/3"
                        >
                            <Video title={video.title} url={video.url} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 border-white/20 bg-black/80 text-white hover:bg-black"/>
                <CarouselNext className=" right-2 border-white/20 bg-black/80 text-white hover:bg-black" />
            </Carousel>
        </div>
    )
}
