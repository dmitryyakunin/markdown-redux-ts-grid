import React, {FC, useEffect} from "react"

import Posts from "../components/posts/Posts";
import Post from "../components/posts/Post";
import Links from "../components/Links";
import {
    getBriefly,
    getDirectories,
    getDirTitles, getPages,
    selectConfig, selectPages,
    selectTitles,
    setCurDir
} from "../components/posts/postsSlice";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {getTitle} from "../lib/getTitle";


import "./page.css";
import Navbar from "../components/Navbar";

const ItDepartment: FC = () => {
    const dispatch = useAppDispatch();
    //let pages: string[] = useAppSelector(selectPages);
    let pages: any;
    const config: string[] = useAppSelector(selectConfig);
    const titles: string[] = useAppSelector(selectTitles);
    let cur_dir: string[];

    useEffect(() => {
        getPageDir();
    }, [])

    async function getPageDir() {
        pages = await dispatch(getPages());
        let page: string = pages.payload.content;
        let dir: string[] = page.split('\r\n');
        cur_dir = dir[1].split(':');

        await dispatch(setCurDir(cur_dir[0]));
        await getCategorisFileList(cur_dir[0]);
        await dispatch(getDirTitles(cur_dir[0]));
    }

    async function getCategorisFileList(cur_dir: string) {
        try {
            let directories = await dispatch(getDirectories(cur_dir));
            if (directories.type !== 'posts/getconfigfile/rejected') {
                for (let i = 0; i < directories.payload.data.length; i++) {
                    dispatch(getBriefly({
                        folderName: directories.payload.data[i], cur_dir:cur_dir
                    }));
                }
            }
        } catch (e) {
            console.log(e.message);
        }
    }

    return (
        <div className="main">
            <div className="header">
                <Navbar/>
            </div>

            <div className="aside">
                {config.length > 0 &&
                  <div className="post-container">
                      {config.map((conf, i) => {
                              return (
                                  <div key={i} className="post-card">
                                      <Links folderName={conf}
                                             title={getTitle(titles, conf)}
                                      />
                                  </div>
                              )
                          })
                      }
                  </div>
                }
            </div>

            <div className="article">
                <div className="page-title">
                    <h2>Отдел информационных технологий</h2>
                </div>

                <div style={{margin: '0.5em'}}>
                    <Post indexStr={'1'}/>
                </div>
            </div>

            <div className="document">
                <Posts index={1}/>
            </div>

        </div>
    )
}

export default ItDepartment