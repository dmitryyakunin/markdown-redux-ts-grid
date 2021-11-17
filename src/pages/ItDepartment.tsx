import React, {FC, useEffect} from "react"

import Posts from "../components/posts/Posts";
import Post from "../components/posts/Post";
import Links from "../components/Links";
import {
    getBriefly,
    getDirectories,
    getDirTitles,
    selectConfig,
    selectTitles,
    setCurDir
} from "../components/posts/postsSlice";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {getTitle} from "../lib/getTitle";


import "./page.css";
import Navbar from "../components/Navbar";

const ItDepartment: FC = () => {
    const dispatch = useAppDispatch();
    const config: string[] = useAppSelector(selectConfig);
    const titles: string[] = useAppSelector(selectTitles);
    const cur_dir = 'it_dept';

    useEffect(() => {
        dispatch(setCurDir(cur_dir));
        getCategorisFileList();
        dispatch(getDirTitles(cur_dir));
    }, [])

    async function getCategorisFileList() {
        let directories = await dispatch(getDirectories(cur_dir));
        if (directories.payload) {
            for (let i = 0; i < directories.payload.data.length; i++) {
                dispatch(getBriefly({folderName: directories.payload.data[i], cur_dir:cur_dir}));

            }
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
                <div>
                    <h2>Отдел информационных технологий</h2>
                </div>

                <div style={{margin: '0.5em'}}>
                    <Post index={1}/>
                </div>
            </div>

            <div className="document">
                <Posts index={1}/>
            </div>

        </div>
    )
}

export default ItDepartment