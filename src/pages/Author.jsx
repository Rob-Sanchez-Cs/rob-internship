import React, { useState, useEffect } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";

import "../css/Author.css";

const Author = () => {
  async function fetchAuthorData() {
    const response = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
    );

    setAuthorData(response.data);
    setLoading(false);
  }

  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [authorData, setAuthorData] = useState({});
  const [following, setFollowing] = useState(false);

  useEffect(() => {

    fetchAuthorData();

    return () => {
      setAuthorData({});
    };
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {loading ? (
                        <div className="skeleton skeleton__pfp2"></div>
                      ) : (
                        <>
                          <img src={authorData.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </>
                      )}

                      <div className="profile_name">
                        <h4>
                          {loading ? (
                            <>
                              <span className="skeleton skeleton__margin">
                                {authorData.authorName}
                              </span>
                              <span className="profile_username skeleton skeleton__margin">
                                @{authorData.tag}
                              </span>
                              <span
                                id="wallet"
                                className="profile_wallet skeleton skeleton__margin"
                              >
                                {authorData.address}
                              </span>
                            </>
                          ) : (
                            <>
                              <span >
                                {authorData.authorName}
                              </span>
                              <span className="profile_username">
                                @{authorData.tag}
                              </span>
                              <span
                                id="wallet"
                                className="profile_wallet"
                              >
                                {authorData.address}
                              </span>
                            </>
                          )}
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {loading ? (<div className="profile_follower skeleton">
                        {following
                          ? authorData.followers + 1
                          : authorData.followers}{" "}
                        followers
                      </div>) : (<div className="profile_follower">
                        {following
                          ? authorData.followers + 1
                          : authorData.followers}{" "}
                        followers
                      </div>)}
                      <Link
                        to="#"
                        onClick={() => setFollowing(!following)}
                        className="btn-main"
                      >
                        {following ? "Unfollow" : "Follow"}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems data={authorData} loading={loading} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
