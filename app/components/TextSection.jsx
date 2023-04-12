export function TextSection({section, id}) {
  return (
    <div className={`w-full`} id={id}>
      <h1 className={`text-3xl mb-3 uppercase text-center sm:text-left`}>
        {section.title}
      </h1>
      {section.body.map((subsection, i) => {
        if (subsection.type === 'paragraph') {
          return (
            <p className={`text-justify mb-3 text-lg leading-8`} key={i}>
              {subsection.content}
            </p>
          );
        } else if (subsection.type === 'list') {
          return (
            <ul className={`list-disc ps-6 text-lg leading-8`} key={i}>
              { subsection.content.map((listElement, i) => 
                <li className={`pb-2`} key={i}>{listElement}</li>
              )}
            </ul>
          );
        }
      })}
    </div>
  );
}
