import { Example } from "./Example";

import styles from "./Example.module.css";

export type ExampleModel = {
    text: string;
    value: string;
};

const EXAMPLES: ExampleModel[] = [
    {
        text: "What are special clouds like Gallatin?",
        value: "What are special clouds like Gallatin?"
    },
    { text: "How can I identify a split meeting issue?", value: "How can I identify a split meeting issue?" },
    {
        text: "How do I figure out who removed the CallRecorder bot from CosmosDB?",
        value: "How do I figure out who removed the CallRecorder bot from CosmosDB?"
    }
];

interface Props {
    onExampleClicked: (value: string) => void;
}

export const ExampleList = ({ onExampleClicked }: Props) => {
    return (
        <ul className={styles.examplesNavList}>
            {EXAMPLES.map((x, i) => (
                <li key={i}>
                    <Example text={x.text} value={x.value} onClick={onExampleClicked} />
                </li>
            ))}
        </ul>
    );
};
