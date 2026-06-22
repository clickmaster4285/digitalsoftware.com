// components/sections/PasSection.tsx
'use client';
import { motion } from 'framer-motion';
import { Zap, Check, Target, Shield, Sparkles, GitBranch, Users, Rocket, AlertCircle, TrendingUp, Lightbulb } from 'lucide-react';
import { Reveal } from './Reveal';
import { SectionLabel } from './SectionLabel';
import { ClickItem } from './types';

interface PasSectionProps {
  pasText: string;
}

// Original ClickLetter component for CLICK GROWTH SYSTEM format
const ClickLetter = ({ letter, title, desc, icon: Icon }: ClickItem) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="group relative rounded-3xl border border-gray-200 bg-foreground p-8 hover:border-[#FF2E86]/40 transition-all duration-300 shadow-sm"
  >
    <div className="flex gap-6 items-center">
      <div className="flex flex-col items-center shrink-0">
        <div className="w-16 h-16 rounded-2xl text-[#FF2E86] grid place-items-center text-6xl font-display font-bold shadow-none">
          {letter}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-4">
          <h3 className="font-display text-3xl tracking-tight text-gray-900">{title}</h3>
        </div>
        <p className="text-gray-600 leading-relaxed text-[15px]">{desc}</p>
      </div>
    </div>
  </motion.div>
);

// New UI for PROBLEM/AGITATION/SOLUTION format
// New UI for PROBLEM/AGITATION/SOLUTION format
const PasProblemAgitationSolution = ({
  problem,
  agitation,
  solution,
}: {
  problem: string;
  agitation: string;
  solution: string;
}) => {
  const items = [
    problem && "problem",
    agitation && "agitation",
    solution && "solution",
  ].filter(Boolean);

  const colCount = Math.min(items.length, 3);

  const gridClass =
    colCount === 1
      ? "md:grid-cols-1"
      : colCount === 2
      ? "md:grid-cols-2"
      : "md:grid-cols-3";

  return (
    <section className="relative bg-background text-foreground py-24 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 select-none text-center font-display text-[18vw] leading-none text-foreground/[0.03]">
        PROBLEM
      </div>

      <div className="container max-w-6xl mx-auto px-6 relative z-10">
        <SectionLabel number="02" text="Problem · Agitation · Solution" />

        <Reveal>
          <h2 className="font-display text-5xl md:text-7xl font-medium leading-[0.95] tracking-tighter mt-6 mb-16">
            The <span className="text-[#FF2E86]">Problem</span> We Solve
          </h2>
        </Reveal>

        <div className={`grid gap-6 ${gridClass}`}>
          {/* PROBLEM */}
          {problem && (
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-[#FF2E86]/20 bg-[#FF2E86]/5 p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-2xl">
                    <AlertCircle className="w-7 h-7 text-[#FF2E86]" />
                  </div>
                  <h3 className="font-display text-2xl tracking-tight text-white">
                    PROBLEM
                  </h3>
                </div>
                <p className="text-foreground/80 text-base leading-relaxed">
                  {problem}
                </p>
              </div>
            </Reveal>
          )}

          {/* AGITATION */}
          {agitation && (
            <Reveal delay={0.2}>
              <div className="rounded-3xl border border-[#FF2E86]/20 bg-[#FF2E86]/5 p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-2xl">
                    <TrendingUp className="w-7 h-7 text-[#FF2E86]" />
                  </div>
                  <h3 className="font-display text-2xl tracking-tight text-white">
                    AGITATION
                  </h3>
                </div>
                <p className="text-foreground/80 text-base leading-relaxed">
                  {agitation}
                </p>
              </div>
            </Reveal>
          )}

          {/* SOLUTION */}
          {solution && (
            <Reveal delay={0.3}>
              <div className="rounded-3xl border border-[#FF2E86]/20 bg-[#FF2E86]/5 p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-2xl">
                    <Lightbulb className="w-7 h-7 text-[#FF2E86]" />
                  </div>
                  <h3 className="font-display text-2xl tracking-tight text-white">
                    SOLUTION
                  </h3>
                </div>
                <p className="text-foreground/80 text-base leading-relaxed">
                  {solution}
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
};

// Original Dark Section (BEFORE & AFTER)
export const PasDarkSection = ({ pasText }: PasSectionProps) => {
  const pasContent = parsePasContent(pasText);
  
  // Check if we have PROBLEM/AGITATION/SOLUTION format
  const hasProblemAgitationSolution = pasContent.problem || pasContent.agitation || pasContent.solution;
  
  if (hasProblemAgitationSolution) {
    return (
      <PasProblemAgitationSolution 
        problem={pasContent.problem || ''}
        agitation={pasContent.agitation || ''}
        solution={pasContent.solution || ''}
      />
    );
  }
  
  // Original BEFORE/AFTER UI - with equal height cards
  return (
    <section className="relative bg-background text-foreground py-24 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 select-none text-center font-display text-[18vw] leading-none text-foreground/[0.03]">
        PROBLEM
      </div>

      <div className="container max-w-6xl mx-auto px-6 relative z-10">
        <SectionLabel number="02" text="Problem · Agitation · Solution" />
        <Reveal>
          <h2 className="font-display text-5xl md:text-7xl font-medium leading-[0.95] tracking-tighter mt-6 mb-16">
            The <span className="text-[#FF2E86]">Problem</span> We Solve
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8">
          {pasContent.before && (
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-10 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl">
                    <Zap className="w-7 h-7 text-[#FF2E86]" />
                  </div>
                  <h3 className="font-display text-3xl tracking-tight">THE BEFORE</h3>
                </div>
                <p className="text-foreground/80 text-lg leading-relaxed flex-1">{pasContent.before}</p>
              </div>
            </Reveal>
          )}
          {pasContent.after && (
            <Reveal delay={0.2}>
              <div className="rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-10 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3">
                    <Check className="w-7 h-7 text-[#FF2E86]" />
                  </div>
                  <h3 className="font-display text-3xl tracking-tight">THE AFTER</h3>
                </div>
                <p className="text-foreground/80 text-lg leading-relaxed flex-1">{pasContent.after}</p>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
};




// Light Section - detects which bridge format to use
export const PasLightSection = ({ pasText }: PasSectionProps) => {
  const pasContent = parsePasContent(pasText);
  
  // If we have PROBLEM/AGITATION/SOLUTION format, still show the CLICK GROWTH SYSTEM if present
  if (pasContent.clickItems.length === 0) {
    return null;
  }
  
  return (
    <section className="relative bg-white py-24 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 select-none text-center font-display text-[18vw] leading-none text-gray-100">
        GROWTH
      </div>

      <div className="container max-w-6xl mx-auto px-6 relative z-10">
        {pasContent.clickItems.length > 0 && (
          <div>
            <Reveal>
              <div className="mb-12">
                <h3 className="font-display text-4xl md:text-6xl tracking-tighter mb-3 text-gray-900">
                  THE BRIDGE — <span className="text-[#FF2E86]">CLICK GROWTH SYSTEM</span>
                </h3>
                <p className="text-gray-500 max-w-md">Six powerful levers that transform your growth trajectory</p>
              </div>
            </Reveal>
            
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
              <div className="lg:col-span-5 lg:sticky lg:top-28 h-fit">
                <div className="flex flex-col gap-2 mb-8">
                  <div className="w-20 h-20 rounded-2xl text-[#FF2E86] grid place-items-center text-7xl font-display font-bold shadow-none">
                    CLICK
                  </div>
                  <div>
                    <div className="text-sm mb-2 uppercase tracking-[0.4em] text-gray-800">GROWTH FRAMEWORK</div>
                    <div className="text-2xl font-light text-gray-800">6 Core Pillars</div>
                  </div>
                </div>

                <div className="h-px bg-gray-200 mb-8" />
                <p className="text-gray-800 leading-relaxed max-w-md text-sm">
                  A systematic approach built for sustainable, scalable growth across all channels.
                </p>
              </div>

              <div className="lg:col-span-7 space-y-4">
                {pasContent.clickItems.map((item, i) => (
                  <Reveal key={i} delay={i * 0.07}>
                    <ClickLetter {...item} />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// Updated parser that handles both formats
// Updated parser that properly handles your text format
const parsePasContent = (pasText: string) => {
  const lines = pasText.split('\n').filter(Boolean);
  let before = '';
  let after = '';
  let problem = '';
  let agitation = '';
  let solution = '';
  let currentSection = 'before';
  const clickItems: ClickItem[] = [];
  const icons: Record<string, any> = {
    'C': Target,
    'L': Shield,
    'I': Sparkles,
    'C2': GitBranch,
    'K': Users,
    'S': Rocket
  };
  
  let isProblemAgitationSolutionFormat = false;
  
  // First, check if we have explicit PROBLEM/AGITATION/SOLUTION labels
  const hasExplicitLabels = lines.some(line => 
    line.trim().startsWith('PROBLEM:') || 
    line.trim().startsWith('AGITATION:') || 
    line.trim().startsWith('SOLUTION:')
  );
  
  if (!hasExplicitLabels) {
    // Join all text for parsing
    const fullText = lines.join(' ');
    
    // Split by common section markers
    const sections = fullText.split(/(?:KEY ANCHORS:|COMPLIANCE:|CPC ADVANTAGE:|Solution:)/i);
    const labels = fullText.match(/(?:KEY ANCHORS:|COMPLIANCE:|CPC ADVANTAGE:|Solution:)/gi) || [];
    
    // Parse the text into sections
    let parsedSections: { label: string; content: string }[] = [];
    let currentLabel = '';
    let currentContent = '';
    
    for (let i = 0; i < fullText.length; i++) {
      // Check for section markers
      const remaining = fullText.substring(i);
      const keyAnchorsMatch = remaining.match(/^KEY ANCHORS:/i);
      const complianceMatch = remaining.match(/^COMPLIANCE:/i);
      const cpcMatch = remaining.match(/^CPC ADVANTAGE:/i);
      const solutionMatch = remaining.match(/^Solution:/i);
      
      if (keyAnchorsMatch) {
        if (currentLabel) {
          parsedSections.push({ label: currentLabel, content: currentContent.trim() });
        }
        currentLabel = 'KEY ANCHORS';
        currentContent = '';
        i += keyAnchorsMatch[0].length;
        continue;
      } else if (complianceMatch) {
        if (currentLabel) {
          parsedSections.push({ label: currentLabel, content: currentContent.trim() });
        }
        currentLabel = 'COMPLIANCE';
        currentContent = '';
        i += complianceMatch[0].length;
        continue;
      } else if (cpcMatch) {
        if (currentLabel) {
          parsedSections.push({ label: currentLabel, content: currentContent.trim() });
        }
        currentLabel = 'CPC ADVANTAGE';
        currentContent = '';
        i += cpcMatch[0].length;
        continue;
      } else if (solutionMatch) {
        if (currentLabel) {
          parsedSections.push({ label: currentLabel, content: currentContent.trim() });
        }
        currentLabel = 'SOLUTION';
        currentContent = '';
        i += solutionMatch[0].length;
        continue;
      }
      
      currentContent += fullText[i];
    }
    
    // Add the last section
    if (currentLabel) {
      parsedSections.push({ label: currentLabel, content: currentContent.trim() });
    }
    
    // Determine which sections map to PROBLEM, AGITATION, SOLUTION
    const problemParts: string[] = [];
    const agitationParts: string[] = [];
    const solutionParts: string[] = [];
    
    for (const section of parsedSections) {
      if (section.label === 'KEY ANCHORS') {
        // Extract just the first sentence or two for the problem
        const sentences = section.content.match(/[^.!?]+[.!?]+/g) || [];
        if (sentences.length > 0) {
          // The problem is the complexity of multiple authorities
          problemParts.push(sentences.slice(0, Math.min(2, sentences.length)).join(' '));
        }
        if (sentences.length > 1) {
          // The agitation is the compliance burden
          agitationParts.push(sentences.slice(1).join(' '));
        }
      } else if (section.label === 'COMPLIANCE') {
        // Compliance adds to the agitation
        agitationParts.push(section.content);
      } else if (section.label === 'CPC ADVANTAGE') {
        // Cost advantage is the agitation (showing what you're missing or saving)
        agitationParts.push(section.content);
      } else if (section.label === 'SOLUTION') {
        solutionParts.push(section.content);
      }
    }
    
    // Build the final strings
    problem = problemParts.join(' ').trim() || 'Multiple regulatory bodies and complex compliance requirements';
    agitation = agitationParts.join(' ').trim() || 'Navigating compliance while managing costs';
    solution = solutionParts.join(' ').trim() || '';
    
    // If no solution was found, try to extract it from the end of the text
    if (!solution) {
      const solutionMatch = fullText.match(/Clickmasters\s+[^.]*\./i);
      if (solutionMatch) {
        solution = solutionMatch[0].trim();
      }
    }
    
    // If we have content, mark as PAS format
    if (problem || agitation || solution) {
      isProblemAgitationSolutionFormat = true;
    }
    
    return { before, after, problem, agitation, solution, clickItems, isProblemAgitationSolutionFormat };
  }
  
  // Original explicit label parsing (keep as fallback)
  for (const line of lines) {
    const trimmed = line.trim();
    
    // Check if this is PROBLEM/AGITATION/SOLUTION format with explicit labels
    if (trimmed.startsWith('PROBLEM:')) {
      isProblemAgitationSolutionFormat = true;
      problem = trimmed.replace('PROBLEM:', '').trim();
      currentSection = 'problem';
      continue;
    } 
    else if (trimmed.startsWith('AGITATION:')) {
      isProblemAgitationSolutionFormat = true;
      agitation = trimmed.replace('AGITATION:', '').trim();
      currentSection = 'agitation';
      continue;
    }
    else if (trimmed.startsWith('SOLUTION:')) {
      isProblemAgitationSolutionFormat = true;
      solution = trimmed.replace('SOLUTION:', '').trim();
      currentSection = 'solution';
      continue;
    }
    
    // Original format handlers
    if (trimmed.startsWith('THE BEFORE:')) {
      currentSection = 'before';
      before = trimmed.replace('THE BEFORE:', '').trim();
      continue;
    } 
    else if (trimmed.startsWith('THE AFTER:')) {
      currentSection = 'after';
      after = trimmed.replace('THE AFTER:', '').trim();
      continue;
    } 
    
    // Bridge detection
    if (trimmed.includes('CLICK GROWTH SYSTEM') || 
        trimmed.includes('click growth system') ||
        trimmed.includes('THE BRIDGE')) {
      currentSection = 'bridge';
      continue;
    } 
    
    // Bridge items
    if (currentSection === 'bridge' && trimmed.match(/^[CKLIS] —/)) {
      const match = trimmed.match(/^([CKLIS]) — ([^:]+):/);
      if (match) {
        const letter = match[1];
        const title = match[2].trim();
        const desc = trimmed.replace(match[0], '').trim();
        const iconKey = letter === 'C' && clickItems.some(item => item.letter === 'C') ? 'C2' : letter;
        clickItems.push({
          letter,
          title,
          desc,
          icon: icons[iconKey] || Target
        });
      }
      continue;
    } 
    
    // Handle multi-line descriptions for bridge items
    if (currentSection === 'bridge' && trimmed && 
        !trimmed.startsWith('THE') && 
        !trimmed.startsWith('PROBLEM') && 
        !trimmed.startsWith('SOLUTION') &&
        !trimmed.startsWith('AGITATION') &&
        !trimmed.includes('CLICK GROWTH') &&
        clickItems.length > 0) {
      const last = clickItems[clickItems.length - 1];
      last.desc += ' ' + trimmed;
    }
    
    // Handle multi-line for PROBLEM/AGITATION/SOLUTION
    if (currentSection === 'problem' && !trimmed.startsWith('AGITATION:') && !trimmed.startsWith('SOLUTION:')) {
      problem += ' ' + trimmed;
    } else if (currentSection === 'agitation' && !trimmed.startsWith('SOLUTION:')) {
      agitation += ' ' + trimmed;
    } else if (currentSection === 'solution') {
      solution += ' ' + trimmed;
    }
  }
  
  return { 
    before, 
    after, 
    problem, 
    agitation, 
    solution,
    clickItems,
    isProblemAgitationSolutionFormat
  };
};

// Combined export
export const PasSection = ({ pasText }: PasSectionProps) => {
  return (
    <>
      <PasDarkSection pasText={pasText} />
      <PasLightSection pasText={pasText} />
    </>
  );
};