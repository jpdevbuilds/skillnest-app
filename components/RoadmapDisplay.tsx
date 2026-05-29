export default function RoadmapDisplay({ content }: { content: string }) {
    const lines = content.split('\n');

    return (
        <div className="space-y-4">
            {lines.map((line, idx) => {
                if (line.startsWith('# ')) {
                    return (
                        <h2 key={idx} className="text-3xl font-bold mt-6 mb-4">
                            {line.replace('# ', '')}
                        </h2>
                    );
                }
                if (line.startsWith('## ')) {
                    return (
                        <h3 key={idx} className="text-xl font-bold mt-4 mb-2 text-gray-900">
                            {line.replace('## ', '')}
                        </h3>
                    );
                }
                if (line.startsWith('### ')) {
                    return (
                        <h4 key={idx} className="text-lg font-semibold mt-3 mb-2 text-gray-800">
                            {line.replace('### ', '')}
                        </h4>
                    );
                }
                if (line.startsWith('- ')) {
                    return (
                        <li key={idx} className="ml-6 text-gray-700 leading-relaxed">
                            {line.replace('- ', '')}
                        </li>
                    );
                }
                if (line.trim() === '') {
                    return <div key={idx} className="h-2" />;
                }
                return (
                    <p key={idx} className="text-gray-700 leading-relaxed">
                        {line}
                    </p>
                );
            })}
        </div>
    );
}