import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Accordion from "./accordion";
import { AccordionSection } from "./accordion-section.interface";

describe("Accordion", () => {
  test("Empty Accordion", async () => {
    const result = render(<Accordion sections={[]} />);
    expect(result.getByTestId("accordion")).not.toBeNull();
    expect(result.queryAllByTestId("accordion-item").length).toBe(0);
  });

  test("Accordion sections", async () => {
    const sections: AccordionSection[] = [
      { title: "Section 1", content: "Content 1" },
      { title: "Section 2", content: "Content 2" },
    ];
    const result = render(<Accordion sections={sections} />);
    expect(result.getByTestId("accordion")).not.toBeNull();
    expect(result.queryAllByTestId("accordion-item").length).toBe(
      sections.length
    );
  });
});
