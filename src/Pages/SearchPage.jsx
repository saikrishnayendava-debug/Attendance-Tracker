import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaFilePdf } from "react-icons/fa";
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingSpinner from '../Components/LoadingSpinner';
const SearchPage = () => {
    const [search, setSearch] = useState();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const handleChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    }
    const handleFetchMore = () => {
        if (totalPages > page) {
            setPage(preve => preve + 1)
        }
    }
    const handleSearch = async () => {
        try {
            setLoading(true);
            if (!search) {
                return;
            }
            const response = await axios.get(`https://database-9qqy.onrender.com/pdf/?search=${search}&page=${page}`);
            setData(response.data.data);
            setTotalPages(response.data.data.totalPages);

        }
        catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }
    const handleView = (pdf) => {
        setPreviewPdf(pdf);
    };
    const handleDownload = async (pdf) => {
        try {
            const response = await fetch(pdf.Url);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `${pdf.Title}.pdf`;
            link.setAttribute('download', `${pdf.Title}.pdf`);
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Download failed:', error);
            const link = document.createElement('a');
            link.href = pdf.Url;
            link.download = `${pdf.Title}.pdf`;
            link.setAttribute('download', '');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };
    const closePreview = () => {
        setPreviewPdf(null);
    };
    useEffect (()=> {
        handleSearch();
    }, [page]);
    return (
        <section className='bg-black min-h-screen'>

            <div className='pt-5 flex justify-center gap-2 items-center'>
                <input type='text' className='w-60 bg-black border border-[#222528] text-slate-200 text-xs rounded-md p-4 flex justify-center items-center font-bold outline-[#03ff81]' onChange={handleChange}>

                </input>
                <button className='bg-[#03ff81] rounded p-3 flex justify-center items-center font-extrabold' onClick={handleSearch}> Search </button>
            </div>
            <div className='container mx-auto p-4'>
                <p className='font-semibold text-sm text-white'>Search Results: {data.length}  </p>
                {
                    loading ? (
                        <LoadingSpinner />
                    ) : (
                         <InfiniteScroll dataLength={data.length} hasMore={true} next={handleFetchMore}>
                            <div className='grid grid-cols-2'>
                                {
                                    data.map((pdf, index) => {
                                        return (
                                            <div key={index} className='border-2 border-[#222528] p-2 h-fit rounded-lg flex flex-col items-center gap-1 text-white w-45'>
                                                <FaFilePdf size={50} color='white' />
                                                <p className='text-xs font-bold max-w-[150px] truncate'>{pdf.Title}</p>
                                                <div className='flex gap-2 text-xs font-bold'>
                                                    <button className='bg-[#03ff81] text-black p-1 rounded px-2' onClick={() => handleView(pdf)}>View</button>
                                                    <button className='bg-[#03ff81] text-black p-1 rounded px-2' onClick={() => handleDownload(pdf)}>Download</button>
                                                </div>
                                                <p className='text-2xs pt-2'>Uploaded by <span className='font-bold'>{pdf.RedgNo}</span></p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </InfiniteScroll>
                    )
                }
                {


                    //no data 
                    !data[0] && !loading && (
                        <div className='flex flex-col justify-center items-center w-full mx-auto'>
                            
                            <p className='font-semibold my-25 text-sm text-slate-200'>No Data found</p>
                        </div>
                    )
                }


            </div>
        </section>
    )
}


export default SearchPage
