type PageProps = {
    params: {
        id: string;
    };
};

export default function Page({ params }: PageProps) {
    const id = params.id;

    return (
        <div className="p-6">
            {/* UI specifica della pagina */}
        </div>
    );
}
