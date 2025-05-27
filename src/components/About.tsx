import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft,
  GraduationCap,
  Users,
  Star,
  Github,
  Linkedin,
  Mail,
  Award,
  BookOpen,
  Code,
  Palette,
  Database,
  Globe,
  Smartphone
} from 'lucide-react';

const About = () => {
  const faculty = [
    {
      name: "Dr. Rajesh Kumar",
      designation: "Head of Department, Professor",
      department: "Computer Science & Engineering",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      experience: "15+ years",
      specialization: "Algorithms & Data Structures"
    },
    {
      name: "Prof. Priya Sharma",
      designation: "Assistant Professor",
      department: "Computer Science & Engineering",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b830?w=400&h=400&fit=crop&crop=face",
      experience: "8+ years",
      specialization: "Software Engineering & Web Development"
    }
  ];

  const students = [
    {
      name: "Arjun Reddy",
      role: "Full Stack Developer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      github: "https://github.com/arjunreddy",
      linkedin: "https://linkedin.com/in/arjunreddy",
      email: "arjun.reddy@student.anits.edu.in",
      skills: ["React", "Node.js", "MongoDB"],
      icon: <Code className="w-5 h-5" />
    },
    {
      name: "Sneha Patel",
      role: "UI/UX Designer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      github: "https://github.com/snehapatel",
      linkedin: "https://linkedin.com/in/snehapatel",
      email: "sneha.patel@student.anits.edu.in",
      skills: ["Figma", "Adobe XD", "React"],
      icon: <Palette className="w-5 h-5" />
    },
    {
      name: "Vikram Singh",
      role: "Backend Developer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      github: "https://github.com/vikramsingh",
      linkedin: "https://linkedin.com/in/vikramsingh",
      email: "vikram.singh@student.anits.edu.in",
      skills: ["Python", "Django", "PostgreSQL"],
      icon: <Database className="w-5 h-5" />
    },
    {
      name: "Ananya Joshi",
      role: "Frontend Developer",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
      github: "https://github.com/ananyajoshi",
      linkedin: "https://linkedin.com/in/ananyajoshi",
      email: "ananya.joshi@student.anits.edu.in",
      skills: ["Vue.js", "TypeScript", "CSS"],
      icon: <Globe className="w-5 h-5" />
    },
    {
      name: "Rohit Kumar",
      role: "Mobile App Developer",
      image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop&crop=face",
      github: "https://github.com/rohitkumar",
      linkedin: "https://linkedin.com/in/rohitkumar",
      email: "rohit.kumar@student.anits.edu.in",
      skills: ["React Native", "Flutter", "Kotlin"],
      icon: <Smartphone className="w-5 h-5" />
    },
    {
      name: "Kavya Nair",
      role: "Data Scientist",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
      github: "https://github.com/kavyanair",
      linkedin: "https://linkedin.com/in/kavyanair",
      email: "kavya.nair@student.anits.edu.in",
      skills: ["Python", "Machine Learning", "TensorFlow"],
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      name: "Aditya Gupta",
      role: "DevOps Engineer",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
      github: "https://github.com/adityagupta",
      linkedin: "https://linkedin.com/in/adityagupta",
      email: "aditya.gupta@student.anits.edu.in",
      skills: ["Docker", "Kubernetes", "AWS"],
      icon: <Award className="w-5 h-5" />
    },
    {
      name: "Meera Reddy",
      role: "Quality Assurance Engineer",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
      github: "https://github.com/meerareddy",
      linkedin: "https://linkedin.com/in/meerareddy",
      email: "meera.reddy@student.anits.edu.in",
      skills: ["Selenium", "Jest", "Cypress"],
      icon: <Star className="w-5 h-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-blue-50/30 to-purple-50/30 dark:from-background dark:via-blue-950/30 dark:to-purple-950/30">
      {/* Watermark */}
      <div className="watermark">AlgoVerse</div>
      
      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg"></div>
            <span className="text-xl font-bold gradient-text">AlgoVerse</span>
          </Link>
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 pt-12 pb-20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About <span className="gradient-text">AlgoVerse</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              A project developed by passionate students at Anil Neerukonds Institute of Technology and Sciences, 
              dedicated to making algorithms and data structures accessible to everyone.
            </p>
            
            {/* College Info */}
            <Card className="algo-card max-w-4xl mx-auto mb-16">
              <CardContent className="p-8">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="feature-icon">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold gradient-text">ANITS</h2>
                    <p className="text-lg text-muted-foreground">Anil Neerukonds Institute of Technology and Sciences</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Established with a vision to provide quality technical education, ANITS has been nurturing 
                  innovative minds and fostering technological advancement. Our Computer Science department 
                  encourages students to build practical projects that solve real-world problems.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Faculty Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="section-title gradient-text">Our Faculty Mentors</h2>
              <p className="text-lg text-muted-foreground">
                Guided by experienced educators who inspire innovation
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {faculty.map((member, index) => (
                <Card key={index} className="algo-card">
                  <CardContent className="p-8 text-center">
                    <Avatar className="w-32 h-32 mx-auto mb-6 border-4 border-primary/20">
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback className="text-2xl bg-primary/10">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                    <p className="text-primary font-semibold mb-2">{member.designation}</p>
                    <p className="text-muted-foreground mb-4">{member.department}</p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-center gap-2">
                        <Award className="w-4 h-4 text-primary" />
                        <span>{member.experience} Experience</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <BookOpen className="w-4 h-4 text-secondary" />
                        <span>{member.specialization}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Students Section */}
          <div>
            <div className="text-center mb-12">
              <h2 className="section-title gradient-text">Our Development Team</h2>
              <p className="text-lg text-muted-foreground">
                Meet the talented students who brought AlgoVerse to life
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {students.map((student, index) => (
                <Card key={index} className="algo-card group hover:scale-105 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <Avatar className="w-20 h-20 mx-auto mb-4 border-2 border-primary/20">
                      <AvatarImage src={student.image} alt={student.name} />
                      <AvatarFallback className="bg-primary/10">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <h3 className="text-lg font-bold mb-1">{student.name}</h3>
                    <div className="flex items-center justify-center gap-2 mb-3">
                      {student.icon}
                      <p className="text-primary font-medium text-sm">{student.role}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 justify-center mb-4">
                      {student.skills.map((skill, skillIndex) => (
                        <span 
                          key={skillIndex}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-center gap-3">
                      <a 
                        href={student.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      <a 
                        href={student.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                      >
                        <Linkedin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </a>
                      <a 
                        href={`mailto:${student.email}`}
                        className="p-2 rounded-full bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                      >
                        <Mail className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Mission Section */}
          <div className="mt-20 text-center">
            <Card className="algo-card max-w-4xl mx-auto">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 gradient-text">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  AlgoVerse was born from our collective passion to make computer science concepts more 
                  accessible and engaging. We believe that learning algorithms and data structures should 
                  be an interactive, visual, and enjoyable experience.
                </p>
                <p className="text-muted-foreground">
                  Through this platform, we aim to bridge the gap between theoretical knowledge and 
                  practical application, helping students worldwide excel in their computer science journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
