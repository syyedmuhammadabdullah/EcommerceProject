import React from 'react'

const PopularProducts = () => {
  return (
    <section className='flex justify-center'>

        <div className="container flex flex-col gap-xl py-p-xxl px-p-xl sm:p-xxl">

            <div className="content max-w-[573px] grid gap-xs">
                <h3>Shop By Popularity</h3>
                <p className='text-text-default'>Discover a carefully curated selection of unique and stylish products. From trendy fashion pieces to timeless home decor, our collections offer a wide range of items that are handpicked to suit your taste and style.</p>
            </div>

                <div className="itemcontainer place-items-center grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3 gap-lg">

                <div className="item  flex items-center flex-col">
                        <div className="img w-full sm:w-[378px] h-[246px] sm:h-[478px] bg-[#EEEEEE]">
                            <figure>
                                <img src="https://th.bing.com/th/id/R.3e7489a038bb6747ed2a4e7e6c0c8560?rik=V4nlkcvS7y5qrw&pid=ImgRaw&r=0" alt="img" className='w-full h-full '/>
                            </figure>
                        </div>

                        <div className="content py-p-md text-center ">

                            <h4>Trendy Fashion Collection</h4>
                            <p className='text-text-secondary pt-p-xs'>Stay on-trend with our modern and stylish home decor pieces that effortlessly elevate your home's aesthetics.</p>

                        </div>


                    </div>
                <div className="item  flex items-center flex-col">
                        <div className="img w-full sm:w-[378px] h-[246px] sm:h-[478px] bg-[#EEEEEE]">
                            <figure>
                                <img src="https://th.bing.com/th/id/R.3e7489a038bb6747ed2a4e7e6c0c8560?rik=V4nlkcvS7y5qrw&pid=ImgRaw&r=0" alt="img" className='w-full h-full '/>
                            </figure>
                        </div>

                        <div className="content py-p-md text-center ">

                            <h4>Trendy Fashion Collection</h4>
                            <p className='text-text-secondary pt-p-xs'>Stay on-trend with our modern and stylish home decor pieces that effortlessly elevate your home's aesthetics.</p>

                        </div>


                    </div>
                <div className="item  flex items-center flex-col">
                        <div className="img w-full sm:w-[378px] h-[246px] sm:h-[478px] bg-[#EEEEEE]">
                            <figure>
                                <img src="https://th.bing.com/th/id/R.3e7489a038bb6747ed2a4e7e6c0c8560?rik=V4nlkcvS7y5qrw&pid=ImgRaw&r=0" alt="img" className='w-full h-full '/>
                            </figure>
                        </div>

                        <div className="content py-p-md text-center ">

                            <h4>Trendy Fashion Collection</h4>
                            <p className='text-text-secondary pt-p-xs'>Stay on-trend with our modern and stylish home decor pieces that effortlessly elevate your home's aesthetics.</p>

                        </div>


                    </div>
                   


                </div>

        </div>

    </section>
  )
}

export default PopularProducts