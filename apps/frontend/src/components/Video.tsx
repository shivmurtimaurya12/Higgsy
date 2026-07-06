export default function Video({ title, url }: { title: string, url: string }) {
    return (
        <div className="overflow-hidden rounded-2xl bg-black text-white shadow-lg">
            <video
                src={url}
                // className="h-[200px] w-full object-cover"
                autoPlay
                loop
                muted
    
            />
            <div className="p-2 text-base">
                {title}
            </div>
        </div>

    )
}