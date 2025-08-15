const FilterCategory = ({ categories, filter, activeFilter }) => {
    const API_URL = import.meta.env.VITE_API_URL;

    const all = () => {
        activeFilter(false);
    };

    const filterCat = (e) => {
        fetch(`${API_URL}/categories/document?id=${e.target.id}`)
            .then((r) => r.ok ? r.json() : null)
            .then((data) => { if (data) filter(data); })
            .catch(err => console.error("Erreur fetch catégorie :", err));

        activeFilter(true);
    };

    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
                border: "1px solid black",
                padding: "15px",
                color: "#DFF0D8",
                backgroundColor: "#3B384D"
            }}
        >
            <div
                onClick={all}
                style={{
                    border: "1px solid #DFF0D8",
                    padding: "5px"
                }}
            >
                ALL
            </div>
            {categories && categories.map((d, i) => (
                <div
                    id={d.id}
                    key={i}
                    onClick={filterCat}
                    style={{
                        border: "1px solid #DFF0D8",
                        padding: "5px"
                    }}
                >
                    {d.name}
                </div>
            ))}
        </div>
    );
};

export default FilterCategory;
