import { AspectRatio } from '@/components/ui/aspect-ratio';
import { getImage } from '@/supabase/supabase';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

interface ImageColumnProps {
    queryKey: string;
    file: {
        path: string;
        id: number;
    }
}
    

export default function ImageColumn({
    queryKey,
    file,
}: ImageColumnProps) {
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
        <AspectRatio ratio={6 / 1} className="rounded-md relative">
            <img src={data?.publicUrl} alt="product" className="overflow-hidden mx-auto object-cover" />
        </AspectRatio>
    )
}
