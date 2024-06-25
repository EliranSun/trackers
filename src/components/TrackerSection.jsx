export const TrackerSection = ({name, component, ...rest}) => {
    const Component = component;

    return (
        <section className="bg-gray-900 p-4 shadow rounded-xl">
            <Component {...rest}/>
        </section>
    )
};