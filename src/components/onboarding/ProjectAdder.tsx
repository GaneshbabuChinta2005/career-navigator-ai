import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Plus } from 'lucide-react';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { TECH_STACK_OPTIONS } from '@/lib/constants';

const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required').max(100),
  complexity: z.coerce.number().min(1).max(5),
});

type ProjectInput = z.infer<typeof projectSchema>;

interface ProjectAdderProps {
  projects: Array<{
    id: string;
    name: string;
    techStack: string[];
    complexity: number;
  }>;
  onAddProject: (project: {
    id: string;
    name: string;
    techStack: string[];
    complexity: number;
  }) => void;
  onRemoveProject: (projectId: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const ProjectAdder = ({
  projects,
  onAddProject,
  onRemoveProject,
  onNext,
  onPrev,
}: ProjectAdderProps) => {
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

  const form = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
      complexity: 2,
    },
  });

  const onSubmit = (values: ProjectInput) => {
    onAddProject({
      id: Date.now().toString(),
      name: values.name,
      techStack: selectedTechs,
      complexity: values.complexity,
    });
    form.reset();
    setSelectedTechs([]);
  };

  const toggleTech = (tech: string) => {
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl font-bold font-display">Add your projects</h2>
        <p className="text-muted-foreground">
          List 1-3 projects you've built. This helps us understand your
          practical experience.
        </p>
      </div>

      {/* Project Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., E-commerce Platform" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="complexity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Complexity (1-5)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    placeholder="1"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-3">
            <label className="text-sm font-medium">Tech Stack</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {TECH_STACK_OPTIONS.map((tech) => (
                <button
                  key={tech}
                  type="button"
                  onClick={() => toggleTech(tech)}
                  className={`px-3 py-2 rounded-lg text-sm transition-all ${
                    selectedTechs.includes(tech)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-foreground hover:bg-secondary/80'
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>

          <Button type="submit" variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </form>
      </Form>

      {/* Projects List */}
      {projects.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-sm">Added Projects</h3>
          {projects.map((project) => (
            <Card key={project.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <h4 className="font-medium">{project.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    Complexity: {project.complexity}/5
                  </p>
                  {project.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => onRemoveProject(project.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="flex gap-3 justify-between">
        <Button variant="outline" onClick={onPrev}>
          ← Back
        </Button>
        <Button onClick={onNext} disabled={projects.length === 0}>
          Continue →
        </Button>
      </div>
    </div>
  );
};
