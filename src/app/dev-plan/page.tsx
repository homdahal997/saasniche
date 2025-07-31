'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { CalendarDays, Clock, Users, Target, CheckCircle, Circle, AlertCircle } from "lucide-react";

interface UserStory {
  id: string;
  title: string;
  description: string;
  storyPoints: number;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Todo' | 'In Progress' | 'Done' | 'Blocked';
  assignee: string;
  sprint?: string;
}

interface Sprint {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  goal: string;
  status: 'Planning' | 'Active' | 'Review' | 'Completed';
  totalPoints: number;
  completedPoints: number;
}

export default function DevPlanPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [mounted, setMounted] = useState(false);

  // Fix hydration by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const sprints: Sprint[] = [
    {
      id: 'sprint-1',
      name: 'Sprint 1: Foundation & Authentication',
      startDate: '2025-07-28',
      endDate: '2025-08-11',
      goal: 'Establish core infrastructure, authentication system, and basic UI components',
      status: 'Active',
      totalPoints: 34,
      completedPoints: 18
    },
    {
      id: 'sprint-2',
      name: 'Sprint 2: AI Content Generation',
      startDate: '2025-08-12',
      endDate: '2025-08-26',
      goal: 'Implement AI-powered content generation with templates and customization',
      status: 'Planning',
      totalPoints: 42,
      completedPoints: 0
    },
    {
      id: 'sprint-3',
      name: 'Sprint 3: Multi-Tenant & Dashboard',
      startDate: '2025-08-27',
      endDate: '2025-09-10',
      goal: 'Complete multi-tenant architecture and advanced dashboard features',
      status: 'Planning',
      totalPoints: 38,
      completedPoints: 0
    }
  ];

  const userStories: UserStory[] = [
    // Sprint 1 Stories
    {
      id: 'US-001',
      title: 'User Registration & Authentication',
      description: 'As a user, I want to register and authenticate so that I can access the platform securely',
      storyPoints: 8,
      priority: 'High',
      status: 'Done',
      assignee: 'Frontend Team',
      sprint: 'sprint-1'
    },
    {
      id: 'US-002',
      title: 'Database Schema Setup',
      description: 'As a developer, I want to set up the database schema so that data can be stored efficiently',
      storyPoints: 5,
      priority: 'High',
      status: 'Done',
      assignee: 'Backend Team',
      sprint: 'sprint-1'
    },
    {
      id: 'US-003',
      title: 'UI Component Library',
      description: 'As a developer, I want reusable UI components so that development is consistent and fast',
      storyPoints: 5,
      priority: 'Medium',
      status: 'Done',
      assignee: 'Frontend Team',
      sprint: 'sprint-1'
    },
    {
      id: 'US-004',
      title: 'Landing Page Design',
      description: 'As a visitor, I want an attractive landing page so that I understand the product value',
      storyPoints: 8,
      priority: 'High',
      status: 'In Progress',
      assignee: 'UI/UX Team',
      sprint: 'sprint-1'
    },
    {
      id: 'US-005',
      title: 'Environment Configuration',
      description: 'As a developer, I want proper environment setup so that the app runs in different environments',
      storyPoints: 3,
      priority: 'Medium',
      status: 'In Progress',
      assignee: 'DevOps Team',
      sprint: 'sprint-1'
    },
    {
      id: 'US-006',
      title: 'API Route Structure',
      description: 'As a developer, I want organized API routes so that backend services are maintainable',
      storyPoints: 5,
      priority: 'High',
      status: 'Todo',
      assignee: 'Backend Team',
      sprint: 'sprint-1'
    },

    // Sprint 2 Stories
    {
      id: 'US-007',
      title: 'OpenAI Integration',
      description: 'As a user, I want AI content generation so that I can create high-quality content quickly',
      storyPoints: 13,
      priority: 'High',
      status: 'Todo',
      assignee: 'Backend Team',
      sprint: 'sprint-2'
    },
    {
      id: 'US-008',
      title: 'Content Templates',
      description: 'As a user, I want pre-built templates so that I can generate industry-specific content',
      storyPoints: 8,
      priority: 'High',
      status: 'Todo',
      assignee: 'Product Team',
      sprint: 'sprint-2'
    },
    {
      id: 'US-009',
      title: 'Content Editor Interface',
      description: 'As a user, I want to edit generated content so that it meets my specific needs',
      storyPoints: 13,
      priority: 'Medium',
      status: 'Todo',
      assignee: 'Frontend Team',
      sprint: 'sprint-2'
    },
    {
      id: 'US-010',
      title: 'Content History & Versioning',
      description: 'As a user, I want to see my content history so that I can track and reuse previous work',
      storyPoints: 8,
      priority: 'Low',
      status: 'Todo',
      assignee: 'Backend Team',
      sprint: 'sprint-2'
    },

    // Sprint 3 Stories
    {
      id: 'US-011',
      title: 'Multi-Tenant Data Isolation',
      description: 'As an organization, I want data isolation so that our information remains secure and private',
      storyPoints: 13,
      priority: 'High',
      status: 'Todo',
      assignee: 'Backend Team',
      sprint: 'sprint-3'
    },
    {
      id: 'US-012',
      title: 'Organization Dashboard',
      description: 'As an admin, I want an organization dashboard so that I can manage users and settings',
      storyPoints: 13,
      priority: 'High',
      status: 'Todo',
      assignee: 'Frontend Team',
      sprint: 'sprint-3'
    },
    {
      id: 'US-013',
      title: 'Usage Analytics',
      description: 'As an admin, I want usage analytics so that I can understand platform utilization',
      storyPoints: 8,
      priority: 'Medium',
      status: 'Todo',
      assignee: 'Analytics Team',
      sprint: 'sprint-3'
    },
    {
      id: 'US-014',
      title: 'Billing Integration',
      description: 'As a business, I want billing integration so that I can monetize the platform',
      storyPoints: 5,
      priority: 'Medium',
      status: 'Todo',
      assignee: 'Backend Team',
      sprint: 'sprint-3'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Done':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'In Progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'Blocked':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Done':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Blocked':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Show loading state during hydration
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-8"></div>
            <div className="grid md:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-32 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Development Plan - Agile Board
          </h1>
          <p className="text-gray-600">
            Track our progress using Agile methodology with sprints, user stories, and continuous delivery
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sprints">Sprints</TabsTrigger>
            <TabsTrigger value="backlog">Product Backlog</TabsTrigger>
            <TabsTrigger value="board">Sprint Board</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Sprints</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">
                    1 active, 2 planned
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Story Points</CardTitle>
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">114</div>
                  <p className="text-xs text-muted-foreground">
                    18 completed, 96 remaining
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Team Velocity</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18</div>
                  <p className="text-xs text-muted-foreground">
                    Points per sprint
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Progress</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">16%</div>
                  <p className="text-xs text-muted-foreground">
                    Overall completion
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Project Timeline</CardTitle>
                <CardDescription>
                  Visual representation of our development sprints
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sprints.map((sprint) => (
                    <div key={sprint.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{sprint.name}</h4>
                        <Badge variant={sprint.status === 'Active' ? 'default' : 'secondary'}>
                          {sprint.status}
                        </Badge>
                      </div>
                      <Progress 
                        value={(sprint.completedPoints / sprint.totalPoints) * 100} 
                        className="h-2"
                      />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{sprint.startDate} - {sprint.endDate}</span>
                        <span>{sprint.completedPoints}/{sprint.totalPoints} points</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sprints" className="space-y-6">
            <div className="grid gap-6">
              {sprints.map((sprint) => (
                <Card key={sprint.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{sprint.name}</CardTitle>
                      <Badge variant={sprint.status === 'Active' ? 'default' : 'secondary'}>
                        {sprint.status}
                      </Badge>
                    </div>
                    <CardDescription>{sprint.goal}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Start Date:</span> {sprint.startDate}
                        </div>
                        <div>
                          <span className="font-medium">End Date:</span> {sprint.endDate}
                        </div>
                        <div>
                          <span className="font-medium">Duration:</span> 2 weeks
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Sprint Progress</span>
                          <span className="text-sm text-gray-600">
                            {sprint.completedPoints}/{sprint.totalPoints} points
                          </span>
                        </div>
                        <Progress 
                          value={(sprint.completedPoints / sprint.totalPoints) * 100} 
                          className="h-3"
                        />
                      </div>

                      <div>
                        <h5 className="font-medium mb-2">User Stories:</h5>
                        <div className="space-y-2">
                          {userStories
                            .filter(story => story.sprint === sprint.id)
                            .map(story => (
                              <div key={story.id} className="flex items-center gap-2 text-sm">
                                {getStatusIcon(story.status)}
                                <span>{story.title}</span>
                                <Badge variant="outline" className="ml-auto">
                                  {story.storyPoints}pt
                                </Badge>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="backlog" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Backlog</CardTitle>
                <CardDescription>
                  All user stories prioritized by business value
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userStories.map((story) => (
                    <div key={story.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(story.status)}
                            <h4 className="font-medium">{story.id}: {story.title}</h4>
                          </div>
                          <p className="text-sm text-gray-600">{story.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getPriorityColor(story.priority)}>
                            {story.priority}
                          </Badge>
                          <Badge className={getStatusColor(story.status)}>
                            {story.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex gap-4">
                          <span><strong>Assignee:</strong> {story.assignee}</span>
                          <span><strong>Story Points:</strong> {story.storyPoints}</span>
                        </div>
                        {story.sprint && (
                          <Badge variant="outline">
                            {sprints.find(s => s.id === story.sprint)?.name.split(':')[0]}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="board" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sprint Board - {sprints.find(s => s.status === 'Active')?.name}</CardTitle>
                <CardDescription>
                  Kanban-style view of current sprint progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  {['Todo', 'In Progress', 'Done', 'Blocked'].map((status) => (
                    <div key={status} className="space-y-3">
                      <h4 className="font-medium text-center p-2 bg-gray-100 rounded">
                        {status}
                      </h4>
                      <div className="space-y-2">
                        {userStories
                          .filter(story => story.status === status && story.sprint === 'sprint-1')
                          .map(story => (
                            <div key={story.id} className="p-3 bg-white border rounded shadow-sm">
                              <div className="text-sm font-medium mb-1">{story.id}</div>
                              <div className="text-sm text-gray-600 mb-2">{story.title}</div>
                              <div className="flex justify-between items-center">
                                <Badge className={getPriorityColor(story.priority)} variant="outline">
                                  {story.priority}
                                </Badge>
                                <span className="text-xs text-gray-500">{story.storyPoints}pt</span>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
