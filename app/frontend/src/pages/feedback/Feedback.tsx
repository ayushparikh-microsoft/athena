import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { feedbackApi, FeedbackRequest } from "../../api";

import styles from "./Feedback.module.css";

type FeedbackFormProps = {};

const FeedbackForm: React.FC<FeedbackFormProps> = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [documentLink, setDocumentLink] = useState("");
    const [documentType, setDocumentType] = useState("Onboarding Doc");
    const [fileType, setFileType] = useState("PDF");
    const [service, setService] = useState("Conversation");
    const [feedback, setFeedback] = useState("");
    const [error, setError] = useState<unknown>();

    const makeApiRequest = async (name: string, documentLink: string, documentType: string, service: string, feedback: string) => {
        error && setError(undefined);

        const request: FeedbackRequest = {
            name: name,
            email: email,
            link: documentLink,
            documenttype: documentType,
            filetype: fileType,
            service: service,
            generalfeedback: feedback
        };

        try {
            const result = await feedbackApi(request);
        } catch (e) {
            setError(e);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            makeApiRequest(name, documentLink, documentType, service, feedback);
            setName("");
            setEmail("");
            setDocumentLink("");
            setDocumentType("Onboarding Doc");
            setFileType("PDF");
            setService("Conversation");
            setFeedback("");
            alert("Thanks for the feedback!");
        } catch (e) {
            setError(e);
        }
    };

    return (
        <div className={styles.formContainer}>
            <h1>Feedback Form</h1>
            <p>Please suggest additional documents to ingest and provide feedback about the app!</p>
            <p>Note that if your file has a type that is not listed, we haven't yet added support for processing it.</p>
            <br />
            <form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name </Form.Label>
                    <Form.Control size="lg" type="text" value={name} onChange={e => setName(e.target.value)} required />
                </Form.Group>
                <br />
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email </Form.Label>
                    <Form.Control size="lg" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
                </Form.Group>
                <br />
                <Form.Group className="mb-3" controlId="formLink">
                    <Form.Label>Document Link </Form.Label>
                    <Form.Control size="lg" type="url" value={documentLink} onChange={e => setDocumentLink(e.target.value)} />
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Label>Document Type </Form.Label>
                    <Form.Select size="lg" name="documentType" value={documentType} onChange={e => setDocumentType(e.target.value)}>
                        <option value="Onboarding Doc">Onboarding Doc</option>
                        <option value="Feature Doc">Feature Doc</option>
                        <option value="TSG">TSG</option>
                    </Form.Select>
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Label>File Type </Form.Label>
                    <Form.Select size="lg" name="fileType" value={fileType} onChange={e => setFileType(e.target.value)}>
                        <option value="PDF">PDF</option>
                        <option value="TXT">TXT</option>
                        <option value="DOCX">DOCX</option>
                        <option value="JPEG">JPEG</option>
                        <option value="PNG">PNG</option>
                        <option value="MD">MD</option>
                    </Form.Select>
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Label>Service </Form.Label>
                    <Form.Select size="lg" name="service" value={service} onChange={e => setService(e.target.value)}>
                        <option value="Conversation">Conversation</option>
                        <option value="Teams Scheduler">Teams Scheduler</option>
                        <option value="Attendee">Attendee</option>
                        <option value="Call Controller">Call Controller</option>
                        <option value="Broker">Broker</option>
                        <option value="Composer">Composer</option>
                        <option value="Middle Tier">Middle Tier</option>
                        <option value="CFV">CFV</option>
                        <option value="ACS">ACS</option>
                    </Form.Select>
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Label>Any suggestions?</Form.Label> <br /> <br />
                    <Form.Control size="lg" type="text" as="textarea" rows={12} cols={80} value={feedback} onChange={e => setFeedback(e.target.value)} />
                </Form.Group>
                <br />
                <Button className={styles.button} size="lg" variant="primary" type="submit">
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default FeedbackForm;
