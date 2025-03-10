import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getImage } from "@/supabase/supabase";
import { useQuery } from "@tanstack/react-query";

interface ImageProps {
  file: {
    path: string;
    id: number;
  }
  alt: string;
  queryKey: string;
}


export default function Image({
  queryKey,
  file,
  alt,
}: ImageProps) {
  const { path: image, id } = file

  const { data, isLoading } = useQuery({
    queryKey: [queryKey, 'image', id],
    queryFn: () => {
      return getImage(image);
    },
  })

  if (isLoading) {
    return (
      <>
        Loading...
      </>
    )
  }

  return (
    <AspectRatio ratio={4 / 3}>
      <img src={data?.publicUrl} alt="Image" />
    </AspectRatio>
  )
}
