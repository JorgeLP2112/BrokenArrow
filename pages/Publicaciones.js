import Footer from "@/components/footer";
import BaseLayout from "@/components/BaseLayout";
import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { CldImage } from 'next-cloudinary';

const Home = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status !== 'loading') {
            if (!session) {
                router.push('/');
            } else if (session.user.isNewUser === true) {
                router.push('/ProfileForm');
            }
        }
    }, [session, router, status]);

    const posts = [{
        "title": "Post 1",
        "subtitle": "Subtitle 1",
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet justo nec justo tincidunt tristique. Nulla facilisi. Sed at felis auctor, bibendum libero eu, ultricies nunc. Aliquam erat volutpat. Nullam non turpis nec purus ultricies ultricies. Phasellus vel libero sed nunc vehicula feugiat. Proin auctor, nunc nec luctus ultricies, metus purus semper mauris, ut luctus justo libero nec nunc. Nulla facilisi. Aliquam erat volutpat. Nullam non turpis nec purus ultricies ultricies. Phasellus vel libero sed nunc vehicula feugiat. Proin auctor, nunc nec luctus ultricies, metus purus semper mauris, ut luctus justo libero nec nunc.",
        "images": [
            "https://pbs.twimg.com/media/Dec3W99WkAYxZhW?format=jpg&name=4096x4096",
            "https://www.google.com/url?sa=i&url=https%3Ahttps://pbs.twimg.com/media/DjJZFEAXcAEdHSo?format=jpg&name=4096x4096%2F%2Ftwitter.com%2FDatazoneC&psig=AOvVaw1ebSqijp9XjzOrKZr8SUcD&ust=1716163737455000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIDh56G2mIYDFQAAAAAdAAAAABAJ"
        ]
    }, {
        "title": "Post 1",
        "subtitle": "Subtitle 1",
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet justo nec justo tincidunt tristique. Nulla facilisi. Sed at felis auctor, bibendum libero eu, ultricies nunc. Aliquam erat volutpat. Nullam non turpis nec purus ultricies ultricies. Phasellus vel libero sed nunc vehicula feugiat. Proin auctor, nunc nec luctus ultricies, metus purus semper mauris, ut luctus justo libero nec nunc. Nulla facilisi. Aliquam erat volutpat. Nullam non turpis nec purus ultricies ultricies. Phasellus vel libero sed nunc vehicula feugiat. Proin auctor, nunc nec luctus ultricies, metus purus semper mauris, ut luctus justo libero nec nunc.",
        "images": [
            "https://pbs.twimg.com/media/Dec3W99WkAYxZhW?format=jpg&name=4096x4096",
            "https://www.google.com/url?sa=i&url=https%3Ahttps://pbs.twimg.com/media/DjJZFEAXcAEdHSo?format=jpg&name=4096x4096%2F%2Ftwitter.com%2FDatazoneC&psig=AOvVaw1ebSqijp9XjzOrKZr8SUcD&ust=1716163737455000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIDh56G2mIYDFQAAAAAdAAAAABAJ"
        ]
    }, {
        "title": "Post 1",
        "subtitle": "Subtitle 1",
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet justo nec justo tincidunt tristique. Nulla facilisi. Sed at felis auctor, bibendum libero eu, ultricies nunc. Aliquam erat volutpat. Nullam non turpis nec purus ultricies ultricies. Phasellus vel libero sed nunc vehicula feugiat. Proin auctor, nunc nec luctus ultricies, metus purus semper mauris, ut luctus justo libero nec nunc. Nulla facilisi. Aliquam erat volutpat. Nullam non turpis nec purus ultricies ultricies. Phasellus vel libero sed nunc vehicula feugiat. Proin auctor, nunc nec luctus ultricies, metus purus semper mauris, ut luctus justo libero nec nunc.",
        "images": [
            "https://pbs.twimg.com/media/Dec3W99WkAYxZhW?format=jpg&name=4096x4096",
            "https://www.google.com/url?sa=i&url=https%3Ahttps://pbs.twimg.com/media/DjJZFEAXcAEdHSo?format=jpg&name=4096x4096%2F%2Ftwitter.com%2FDatazoneC&psig=AOvVaw1ebSqijp9XjzOrKZr8SUcD&ust=1716163737455000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIDh56G2mIYDFQAAAAAdAAAAABAJ"
        ]
    }]


    return <BaseLayout>

        <div className="min-h-screen bg-gray-200 py-8">
            <div className="container mx-auto px-4 w-4/5">
                {posts.map((post, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md mb-6 p-6">
                        <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                        <h3 className="text-xl mb-2">{post.subtitle}</h3>
                        <p className="mb-4">{post.text}</p>
                        {post.images.map((image, index) => (
                            <img key={index} src={image} className="w-full h-64 object-cover mb-4 rounded" />
                        ))}
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Aplicar</button>
                    </div>
                ))}
            </div>
        </div>
        <Footer />
    </BaseLayout>;

};

export default Home;