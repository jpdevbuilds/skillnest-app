export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { skill, level, budget, hours } = body;

    if (!skill) {
      return Response.json({ error: "Skill is required" }, { status: 400 });
    }

    // Generate realistic mock roadmap based on inputs
    const roadmaps: Record<string, Record<string, string>> = {
      beginner: {
        short: `# ${skill} Learning Roadmap (Fast Track - 4 Weeks)

## Week 1-2: Foundations
- Online Course: Complete "${skill} Basics" on Udemy (~$15)
- Resources: Free YouTube tutorials & official documentation
- Time: 2-3 hours/week
- Projects: Create 2-3 mini projects to reinforce concepts

## Week 3: Practical Application
- Build a small project using what you've learned
- Resources: Tutorial-based project guides
- Join community Discord/forums for support

## Week 4: Portfolio Project
- Create 1 substantial project for your portfolio
- Document your learning process
- Share on GitHub

## Recommended Resources
- **Courses:** Udemy, Codecademy, freeCodeCamp
- **Books:** "The Pragmatic ${skill} Developer" (if applicable)
- **Tools:** VS Code, Git, GitHub
- **Budget:** $20-50 for courses

## Next Steps
- Continue building projects
- Contribute to open source
- Join developer communities`,
        
        long: `# ${skill} Comprehensive Learning Path (3 Months)

## Month 1: Foundation Phase
### Week 1-2: Core Concepts
- Structured Course: Udemy/Coursera course (~$30-50)
- Resource: Official documentation + GitHub repos
- Practice: Daily coding exercises (30-60 min/day)

### Week 3-4: Hands-On Projects
- Build 2-3 beginner projects
- Focus on understanding fundamentals
- Write clean, readable code

## Month 2: Intermediate Skills
### Week 5-6: Advanced Topics
- Dive deeper into advanced features
- Study best practices and design patterns
- Read source code of popular libraries

### Week 7-8: Medium Projects
- Build more complex projects
- Implement real-world features
- Focus on code quality and testing

## Month 3: Professional Development
### Week 9-10: Specialization
- Choose a specialty area (if applicable)
- Study cutting-edge tools and frameworks
- Build a portfolio-ready project

### Week 11-12: Portfolio & Community
- Finalize portfolio projects
- Write technical blog posts
- Contribute to open source
- Network with other developers

## Resource Budget: $100-200
- Courses: $50-100
- Books: $30-50
- Tools & services: $20-50
- Optional: Mentorship/bootcamp

## Success Metrics
- 3-5 completed projects
- Active GitHub profile
- Technical blog or portfolio
- Open source contributions`
      },
      intermediate: {
        short: `# Advanced ${skill} Roadmap (2 Months - Rapid Upskill)

## Phase 1: Gap Filling (Week 1-2)
- Review any knowledge gaps from basics
- Study advanced patterns and best practices
- Explore ecosystem tools

## Phase 2: Deep Dive (Week 3-4)
- Focus on specialized areas of ${skill}
- Study high-performance techniques
- Build an intermediate-level project

## Phase 3: Mastery & Portfolio (Week 5-8)
- Contribute to open source projects
- Build 1-2 impressive portfolio pieces
- Document and share your knowledge

## Resources
- Advanced courses: $30-80
- Books on patterns and architecture: $40-100
- Premium tools if needed: $50-200

## Expected Outcome
- Production-ready skills
- Impressive portfolio project
- Ready for professional work`,

        long: `# ${skill} Mastery Program (6 Months)

## Quarter 1: Foundation Refresh & Specialization
### Month 1-2: Strategic Learning
- Identify weak areas and target them
- Study architectural patterns
- Explore ecosystem deeply
- Time: 10-15 hours/week

## Quarter 2: Project Intensive
### Month 3-4: Real-World Application
- Build 2-3 substantial projects
- Implement best practices
- Focus on performance and scalability
- Time: 15-20 hours/week

## Quarter 3: Professional Development
### Month 5-6: Community & Contributions
- Contribute to open source
- Build technical authority
- Write/speak about your work
- Time: 10-15 hours/week

## Investment
- Courses & resources: $100-300
- Tools & services: $100-500
- Books: $50-150

## Outcomes
- Expert-level portfolio
- Open source reputation
- Potential job opportunities
- Thought leadership`
      },
      expert: {
        short: `# ${skill} Expert Roadmap (Ongoing)
## Phase 1: Mastery & Specialization
- Deepen expertise in niche areas
- Study cutting-edge research and tools
## Phase 2: Thought Leadership
- Write technical articles
- Speak at conferences
- Mentor others





## Phase 3: Continuous Learning
- Stay updated with latest trends
- Contribute to open source
- Build innovative projects

## Resources
- Research papers, advanced courses, mentorship
- Budget: $200+ for continuous learning
## Expected Outcome
- Recognized expert in the field
- Strong professional network
- Ongoing growth and impact`,
        long: `# ${skill} Expert Development Path (Ongoing)
## Phase 1: Mastery & Specialization
- Deepen expertise in niche areas of ${skill}
- Study cutting-edge research, tools, and techniques
- Time: Ongoing commitment to learning
## Phase 2: Thought Leadership
- Write in-depth technical articles and case studies
- Speak at industry conferences and meetups
- Mentor aspiring developers in the community
## Phase 3: Continuous Innovation
- Stay updated with latest trends and advancements
- Contribute to open source projects and research
- Build innovative projects that push the boundaries of ${skill}
## Resources
- Research papers, advanced courses, mentorship programs
- Budget: $200+ for continuous learning and growth
## Expected Outcome
- Recognized expert in the field of ${skill}
- Strong professional network and influence
- Ongoing growth, impact, and contribution to the community`
      }
    };

    // Select appropriate roadmap based on budget/hours
    const isShortTrack = Number(hours) < 10 || budget === "limited";
    const roadmapType = isShortTrack ? 'short' : 'long';
    const roadmap = roadmaps[level?.toLowerCase() || 'beginner']?.[roadmapType] || 
                    roadmaps.beginner.short;

    return Response.json({ roadmap });

  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to generate roadmap" },
      { status: 500 }
    );
  }
}