import Masonry from "react-masonry-css";

interface Artwork {
    id: string;
    title: string;
    description: string | null;
    image_url: string
}

export default function MasonrySection({
    artworks,
} : { artworks: Artwork[] | null}) {
    const breakpointColumns = {
        default: 4,
        1024: 3,
        768: 2,
        640: 2,
    }
    return(
            <Masonry
                breakpointCols={breakpointColumns}
                className="w-full h-full flex gap-2 mx-auto md:gap-4 lg:max-w-[95%]"
                columnClassName="space-y-4"
            >
                {artworks?.map((art) => (
                    <div key={art.id} className="rounded-[1rem] md:rounded-[2rem] overflow-hidden">
                        <img src={art.image_url} className="w-full object-cover  opacity-90 transition-all duration-300 hover:scale-105 hover:brightness-105 hover:opacity-100"></img>
                    </div>
                ))}
            </Masonry>
    );
}
