import { Spin } from "antd";

const SuffixLoader: React.FC<{ loading: boolean }> = ({ loading }) => (
    <span
        style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 16,
            height: 16,
        }}
    >
        {loading ? <Spin size="small" /> : null}
    </span>
);

export default SuffixLoader;
