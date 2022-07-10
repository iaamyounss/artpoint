/* eslint-disable @next/next/no-img-element */
import React from 'react';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router'


const getArtists = async (key: null, slug: string) => {
  const { data } = await axios.get(
    `http://localhost:3000/api/slug?slug=${escape(slug)}`
    );
  
  return data
}


export async function getServerSideProps(context: any){
  const id = context.query.slug;
  const artist = await getArtists(null, id);

  return {
    props: { artist }
  }
}

export default function Artists({ artist }: any) {
  return (
    <>
      <Head>
        <title>{artist?.name}</title>
      </Head>
      <div className="bg-gray-200 p-5">
        <div className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 my-2 mx-4 rounded max-w-fit">
          <Link href="/">
            <a>Back to Home</a>
          </Link>
        </div>

        <div id="title" className="pb-5">
          <h1 className="italic hover:not-italic font-medium leading-tight text-3xl text-center mt-0 mb-2">
            {artist?.name}
          </h1>
          <p className="text-gray-600 text-center">Slug : {artist?.slug}</p>
        </div>
        <div className="grid gap-4 sm:grid-col sm:grid-row md:grid-rows-2 md:grid-cols-2">
          {artist?.length === 0 ? (
            <div>...Loading</div>
          ) : (
            artist?.artworks.map((artwork: any) => (
              <div
                key={artwork.id}
                className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100"
              >
                <h3 className="text-xl font-bold">{artwork?.slug}</h3>
                <h4 className="font-normal text-gray-700">
                  {artwork?.texts.map((text: any) => (
                    <div key={text?.id}>
                      <p className="text-neutral-500">{text?.body}</p>
                    </div>
                  ))}
                </h4>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}
