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
        text: "What are the options for Microsoft calling plans?",
        value: "What are the options for Microsoft calling plans?"
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
