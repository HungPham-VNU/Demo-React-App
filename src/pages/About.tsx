export default function About() {
    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">About App</h1>
            <p>
                Ứng dụng Todo List demo các đặc điểm chính của React:
            </p>
            <ul className="list-disc ml-6 mt-2">
                <li>Component-based</li>
                <li>State & Hooks</li>
                <li>Context API</li>
                <li>Custom Hooks</li>
                <li>Routing</li>
                <li>ShadCN UI + Tailwind</li>
                <li>LocalStorage persistence</li>
            </ul>
        </div>
    );
}
