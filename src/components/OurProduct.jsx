
const OurProduct = () => {
    

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-6">Our Product</h1>
            <div className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-2 ">
                <div

                    className="relative  overflow-hidden shadow-lg group lg:col-span-4">
                    <img
                        src='https://sealy.com.sg/wp-content/uploads/2023/10/luxury-modern-bedroom-with-comfortable-double-bed-generated-by-ai-1024x585.jpg'
                        alt=''
                        className="w-full h-64 object-cover transition-transform duration-300 transform group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black h-full flex items-center justify-center bg-opacity-50 p-4">
                        <p className="text-white text-sm font-medium text-center">Luxury Modern Bedroom</p>
                    </div>
                </div>
                <div

                    className="relative  overflow-hidden shadow-lg group lg:col-span-5">
                    <img
                        src='https://www.turenne.com/media/cache/jadro_resize/rc/p35z1T8e1709124243/jadroRoot/medias/5cc700adbfa0b/5cc7027f17b8d/chambre-triple-pre-mium.jpg'
                        alt=''
                        className="w-full h-64 object-cover transition-transform duration-300 transform group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black h-full flex items-center justify-center bg-opacity-50 p-4">
                        <p className="text-white text-sm font-medium text-center">Cozy Bedroom with Natural Light</p>
                    </div>
                </div>
                <div

                    className="relative  overflow-hidden shadow-lg group lg:col-span-3">
                    <img
                        src='https://static.vecteezy.com/system/resources/thumbnails/044/021/031/small_2x/elegant-luxury-hotel-room-opulent-bed-and-bold-red-mural-in-modern-traditional-space-photo.jpeg'
                        alt=''
                        className="w-full h-64 object-cover transition-transform duration-300 transform group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black h-full flex items-center justify-center bg-opacity-50 p-4">
                        <p className="text-white text-sm font-medium text-center">Modern Hotel Room Design</p>
                    </div>
                </div>
                <div

                    className="relative  overflow-hidden shadow-lg group lg:col-span-4">
                    <img
                        src='https://images.lifestyleasia.com/wp-content/uploads/sites/7/2021/12/27113145/78933144_160191155297103_27518598014156658_n.jpeg'
                        alt=''
                        className="w-full h-64 object-cover transition-transform duration-300 transform group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black h-full flex items-center justify-center bg-opacity-50 p-4">
                        <p className="text-white text-sm font-medium text-center">Luxury Modern Bedroom</p>
                    </div>
                </div>
                <div

                    className="relative  overflow-hidden shadow-lg group lg:col-span-3">
                    <img
                        src='https://www.princehotels.com/hiroshima/wp-content/uploads/sites/19/2019/07/Luxury-Room-With-View-Bath-bg.jpg'
                        alt=''
                        className="w-full h-64 object-cover transition-transform duration-300 transform group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black h-full flex items-center justify-center bg-opacity-50 p-4">
                        <p className="text-white text-sm font-medium text-center">Luxury Room with View Bath</p>
                    </div>
                </div>
                <div

                    className="relative  overflow-hidden shadow-lg group lg:col-span-5">
                    <img
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTONMSh8vChdiy9YGQT1xOOh_VWcO0wwxLXKw&s'
                        alt=''
                        className="w-full h-64 object-cover transition-transform duration-300 transform group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black h-full flex items-center justify-center bg-opacity-50 p-4">
                        <p className="text-white text-sm font-medium text-center">Modern Luxury Suite</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurProduct;