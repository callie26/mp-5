"use client"

import {useState} from "react";
import styled from "styled-components";
import checkDB from "@/lib/checkDB";
import Link from "next/link";

const PageWrapper = styled.div`
    background-color: #f4dada;
    height: 100vh;
`;

const TitleWrapper = styled.div`
    text-align: center;
    margin-top: 5%;
    margin-left: 0;
    margin-right: 0;
`;

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    margin: 2% 20%;
    padding: 2%;
    border-radius: 8px;
`;

const StyledHeader = styled.header`
    font-family: "Monaco", "Courier New", monospace;
    background-color: white;
    font-size: 35px;
    padding: 1%;
`;

const StyledH1 = styled.h1`
    font-family: "Monaco", "Courier New", monospace;
    font-weight: bolder;
    margin: 0;
`;

const StyledH2 = styled.h2`
    font-family: "Monaco", "Courier New", monospace;
    font-weight: bold;
    margin: 0;
`;

const StyledH3 = styled.h3`
    font-family: "Monaco", "Courier New", monospace;
    font-weight: lighter;
    margin-bottom: 1%;
`;

const StyledP = styled.p`
    font-family: "Monaco", "Courier New", monospace;
    font-weight: lighter;
    color: grey;
    margin-top: 0;
`;

const StyledInput = styled.input`
    font-family: "Monaco", "Courier New", monospace;
    padding: 1%;
    margin-bottom: 1%;
`;

const StyledButton = styled.button`
    font-family: "Monaco", "Courier New", monospace;
    background-color: crimson;
    color: white;
    text-align: center;
    border: none;
    border-radius: 4px;
    padding: 1%;
`;

const StyledP2 = styled.p`
    font-family: "Monaco", "Courier New", monospace;
    font-weight: lighter;
    color: crimson;
    margin-top: 2%;
`;

const StyledLink = styled(Link)`
    font-family: "Monaco", "Courier New", monospace;
    font-weight: lighter;
    color: crimson;
    margin-top: 0%;
`;

export default function Home() {
    const [url, setUrl] = useState('');
    const [alias, setAlias] = useState('');
    const [error, setError] = useState('');
    const [shortenedURL, setShortenedURL] = useState('');


    async function handleSubmit() {
        setError('')
        setShortenedURL('')

        const {success, error} = await checkDB(url, alias)

        if (success && error === "") {
            setShortenedURL(` https://mp-5-iota.vercel.app/${alias}`)
        }
        else {
            setError(error)
        }
    }

    return (
        <PageWrapper>
            <StyledHeader>URL Shortener</StyledHeader>

            <TitleWrapper>
                <StyledH1>URL Shortener</StyledH1>
                <StyledP>Shorten your long URLs into compact, shareable links</StyledP>
            </TitleWrapper>

            <StyledDiv>
                <StyledH2>Shorten a URL</StyledH2>
                <StyledP>Enter a long URL to create a shorter, sharable link</StyledP>

                {/*input long url*/}
                <StyledH3>URL</StyledH3>
                <StyledInput type="text" value={url} placeholder="https://example.com/very/long/url" onChange={(e) => setUrl(e.target.value)}/>

                {/*input alias*/}
                <StyledH3>Custom Alias</StyledH3>
                <StyledP>
                    https://mp-5-iota.vercel.app/
                    <StyledInput type="text" value={alias} placeholder="your-custom-alias" onChange={(e) => setAlias(e.target.value)}/>
                </StyledP>

                {/*submit button to get shortened url*/}
                <StyledButton onClick={handleSubmit}>Get shortened url</StyledButton>

                <StyledP2>{error}</StyledP2>
                <StyledLink href={shortenedURL}>{shortenedURL}</StyledLink>
            </StyledDiv>
        </PageWrapper>
    );
}
