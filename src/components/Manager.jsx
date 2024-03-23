import React, { useEffect, useState } from 'react'
import { getPass, savePass } from '../utils/features';
import { useSortBy, useTable,usePagination } from 'react-table'
import toast from 'react-hot-toast';


const columns = [
    {
        Header: "Site",
        accessor: "site"
    },
    {
        Header: "Username",
        accessor: "username",

    },
    {
        Header: "Password",
        accessor: "password"
    },
    {
        Header: "Action",
        accessor: "action"
    }
]

const Manager = () => {
    const [pass, setPass] = useState(getPass());
    const [showpass, setShowpass] = useState(false)
    const [site, setSite] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [data, setData] = useState([])



    // add pass handler
    const submitHandler = () => {
        if (site !== "" && username !== "" && password !== "") {
            const newPass = { site, username, password, id: Math.random() * 10 }
            setPass(prev => ([...prev, newPass]))
            setUsername("");
            setPassword("");
            setSite("");
            toast.success("Password Added Successfully")


        }
    }


    // edit pass handler
    const editHandler = (id) => {
        const { site } = pass.filter((i) => i.id === id)[0]
        setSite(site);
        const { password } = pass.filter((i) => i.id === id)[0]
        setPassword(password);
        const { username } = pass.filter((i) => i.id === id)[0]
        setUsername(username);
        setPass(pass.filter((i) => (i.id !== id)))

    }

    // delete pass handler 
    const deleteHandler = (id) => {
        const newPass = pass.filter((i) => (i.id !== id));
        setPass(newPass)
        toast.success("Password Deleted")

    }

    // Table
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        getSortByToggleProps,
        nextPage,
        previousPage,
        canPreviousPage,
        canNextPage,
        state:{pageIndex},
        pageCount
    } = useTable({
        columns,
        data: pass,
        initialState:{pageSize:5}
    }, useSortBy,usePagination);



    useEffect(() => {
        savePass(pass)
    }, [pass])


    return (
        <>
            <div>
                <div className="absolute top-0 -z-10 h-full w-full bg-white"><div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(129,240,159,0.5)] opacity-50 blur-[80px] "></div></div>


                {/* Manager component*/}
                <div className="md:mycontainer  mx-auto w-5/6 pb-0">

                    <h1 className='font-bold text-2xl text-center'>
                        <span className='text-green-500'>&lt;</span>
                        <span>Pass<span className='text-green-500'>Manager&gt;</span></span>
                    </h1>

                    <p className='text-center font-semibold  text-lg text-green-900'>Your Own Pass Manager</p>
                    {/* other section start */}
                    <div className='flex text-white flex-col py-6 px-5 gap-5 items-center'>
                        <input className=' border border-green-800 rounded-2xl text-black w-full text-xs p-2 py-1 md:text-xl md:p-3 md:py-1' type="text" placeholder='Enter Website Url'
                            value={site}
                            onChange={(e) => setSite(e.target.value)}
                        />
                        <div className='w-full gap-5 flex flex-col md:flex-row'>
                            <input className='border border-green-800 rounded-2xl text-black w-full text-xs py-1 p-2 md:text-xl md:p-3 md:py-1' type="text"
                                placeholder='Enter Username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            <div className='relative '>
                                <input className='border border-green-800 rounded-2xl text-black w-full text-xs py-1 p-2 md:text-xl md:p-3 md:py-1' type={showpass ? "text" : "password"}
                                    placeholder='Enter Passowrd'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <span className='absolute right-0 text-black md:top-1 mx-1' onClick={() => setShowpass(prev => !prev)}>

                                    {showpass ? <img className='hover:cursor-pointer' width={28} src="./icons/eye.png" alt="eye" /> :
                                        <img className='hover:cursor-pointer' width={28} src="./icons/eye-off.png" alt="eye" />}
                                </span>
                            </div>
                        </div>
                        <button onClick={submitHandler} className='text-black  font-semibold flex items-center justify-center w-fit bg-green-500 hover:bg-green-400 rounded-full px-3 py-1 border border-green-900 '><lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>Save</button>
                    </div>

                    {/* password */}

                    <div >
                        <h2 className='font-bold text-2xl'>Your Password</h2>
                        {pass.length === 0 ? <div className='py-10 font-bold text-xl text-start text-slate-600'>No Password To Show</div> :
                            <table key={pass.id * Math.random() * 1000}  {...getTableProps()} className="table-auto w-full overflow-hidden rounded-md">
                                <thead className='bg-green-400  text-center'>
                                    {headerGroups.map(headerGroup => (
                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map(column => (
                                                <th className={column.Header === "Action" ? "text-right pr-6" : ""}
                                                    {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                    {column.render('Header')}
                                                    {
                                                        column.isSorted && <span>{column.isSortedDesc ? <lord-icon
                                                            src="https://cdn.lordicon.com/xcrjfuzb.json"
                                                            trigger="hover"
                                                            style={{ width: '20px', height: '20px',padding:'4px' }}>
                                                        </lord-icon> : <lord-icon
                                                            src="https://cdn.lordicon.com/ternnbni.json"
                                                            trigger="hover" 
                                                            style={{ width: '20px', height: '20px',padding:'4px' }}
                                                            >
                                                            
                                                                
                                                        </lord-icon>}</span>
                                                    }
                                                </th>
                                            ))}
                                        </tr>
                                    ))}
                                </thead>


                                <tbody  {...getTableBodyProps()} className='bg-green-100 text-center text-slate-600 font-semibold '>
                                    {page.map(row => {
                                        prepareRow(row);
                                        return (
                                            <tr key={row.original.id} {...row.getRowProps()}>
                                                {row.cells.map((cell) => (
                                                    <td key={cell.column.id} {...cell.getCellProps()}>
                                                        {cell.render('Cell')}
                                                        {
                                                            cell.column.id === 'action' && <div>
                                                                <div className='flex justify-end pr-4 items-center gap-2 '>
                                                                    <span onClick={() => editHandler(row.original.id)} className='cursor-pointer'><lord-icon
                                                                        src="https://cdn.lordicon.com/ylvuooxd.json"
                                                                        trigger="hover">
                                                                    </lord-icon></span>
                                                                    <span onClick={() => deleteHandler(row.original.id)} className='cursor-pointer' >
                                                                        <lord-icon
                                                                            src="https://cdn.lordicon.com/skkahier.json"
                                                                            trigger="hover">
                                                                        </lord-icon>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        }
                                                    </td>


                                                ))}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        }
                    </div>

                    {
                        pass.length == 0 ? "" : <div className='flex mt-2 w-[60vw] pt-0 justify-center m-auto '>
                            <button disabled={!canPreviousPage} onClick={previousPage} className='text-black  font-semibold flex items-center justify-center w-fit bg-green-500 hover:bg-green-400 rounded-full px-2 py-0 border border-green-900 '>
                                Prev
                            </button>
                            <span> {pageIndex+1} of {pageCount} </span>
                            <button disabled={!canNextPage} onClick={nextPage} className='text-black  font-semibold flex items-center justify-center w-fit bg-green-500 hover:bg-green-400 rounded-full px-2 py-0 border border-green-900 ' >
                                Next
                            </button>
                           

                        </div>
                    }
                </div>
            </div>



        </>
    )
}

export default Manager
