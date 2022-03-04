import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { Col, Row } from 'reactstrap';
import './NewsDetail.css';
import { getRequest } from './axiosConfig';

type PostType = {
    author: string,
    content: string,
    description: string,
    publishedAt: string,
    source: PostSource,
    title: string,
    url: string,
    urlToImage: string
}

type PostSource = {
    id: string | null,
    name: string
}

function NewsDetail() {

    const params = useParams();
    const [post, setPost] = useState<PostType>({
        author: '',
        content: '',
        description: '',
        publishedAt: '',
        source: {
            id: '',
            name: ''
        },
        title: '',
        url: '',
        urlToImage: ''
    });
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        const getPost = async () => {


            try {
                let res: AxiosResponse = await getRequest(`https://newsapi.org/v2/everything?q="${params.q}"&apiKey=`)

                if (res.status == 200) {
                    setPost(res.data.articles[0]);
                    console.log(res.data.articles[0]);
                }

                setLoading(false);

                return res.data.articles[0];

            } catch (err) {
                console.error(err);
            }
        }

        getPost();
    }, [])

    console.log(post);


    if (loading) {
        return <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    } else {
        return (
            <div className='container mt-4'>
                <Row>
                    <Col className='col-6'>
                        <img
                            src={post.urlToImage}
                            alt={post.title}
                            className='postImg'
                        />
                    </Col>
                    <Col className='col-6'>
                        <h3>
                            {post.title}
                        </h3>
                        <p
                            className='postDesc'
                        >
                            {post.description}
                        </p>
                        <p
                            className='postAuthor'
                        >
                            {post.author}
                        </p>
                        <p
                            className='postDate'
                        >
                            {post.publishedAt}
                        </p>
                    </Col>
                </Row>
                <Row>
                    <p
                        className='postContent'
                    >
                        {post.content}
                    </p>
                </Row>
            </div>
        )
    }

}

export default NewsDetail;