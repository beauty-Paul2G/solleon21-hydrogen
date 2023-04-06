export function TextSection({section}) {
  return (
    <div className={`w-full max-w-7xl px-12`}>
      <h1 className={`text-3xl mb-3 uppercase text-center sm:text-left`}>
        {section.title}
      </h1>
      {section.body.map((subsection, i) => {
        if (subsection.type === 'paragraph') {
          return (
            <p className={`text-justify mb-3`} key={i}>
              {subsection.content}
            </p>
          );
        } else if (subsection.type === 'list') {
          return (
            <ul className={`list-disc ps-6`} key={i}>
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