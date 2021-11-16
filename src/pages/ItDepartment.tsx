import React, {FC, useEffect} from "react"

import Posts from "../components/posts/Posts";
import Post from "../components/posts/Post";
import Links from "../components/Links";
import {getBriefly, getDirectories, getDirTitles, selectConfig, selectTitles} from "../components/posts/postsSlice";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {getTitle} from "../lib/getTitle";


import "./page.css";
import Navbar from "../components/Navbar";

const ItDepartment: FC = () => {
    const dispatch = useAppDispatch();
    const config: string[] = useAppSelector(selectConfig);
    const titles: string[] = useAppSelector(selectTitles);

    useEffect(() => {
        getCategorisFileList();
        dispatch(getDirTitles());
    }, [])

    async function getCategorisFileList() {
        let directories = await dispatch(getDirectories());
        if (directories.payload) {
            for (let i = 0; i < directories.payload.data.length; i++) {
                dispatch(getBriefly(directories.payload.data[i]));
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
                      {config.filter(conf => conf.substr(0, 5) === 'itdp_')
                          .map((conf, i) => {
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