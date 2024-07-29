import { useState } from "react";
import { AccordionSection } from "./accordion-section.interface";

export default function Accordion({
  sections,
}: {
  sections: AccordionSection[];
}) {
  if (!sections) {
    sections = [];
  }
  const map = new Map();
  sections.forEach((_, index) => {
    map.set(index, false);
  });
  const [sectionStates, setSectionStates] = useState(map);
  return (
    <div data-testid="accordion">
      {sections.map((section, index) => {
        return (
          <div key={"section" + index} data-testid="accordion-item">
            <div
              onClick={() => {
                const current = sectionStates.get(index);
                const copy = new Map(sectionStates);
                copy.set(index, !current);
                setSectionStates(copy);
              }}
            >
              {section.title + " "}
              <span aria-hidden={true} className="accordion-icon" />
            </div>
            {sectionStates.get(index) && section.content}
          </div>
        );
      })}
    </div>
  );
}
