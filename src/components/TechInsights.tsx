import { ArrowRight, Clock, User } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    thumbnail: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: '5 Ways AI Automation Can Transform Your Business Operations',
    preview: 'Discover how artificial intelligence and automation tools can streamline repetitive tasks, reduce errors, and free up your team to focus on strategic initiatives.',
    author: 'Sarah Chen',
    date: 'Oct 10, 2025',
    readTime: '5 min read',
    category: 'AI & Automation'
  },
  {
    id: 2,
    thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Why Every Modern Business Needs a Mobile-First Website',
    preview: 'With over 60% of web traffic coming from mobile devices, learn why responsive design is no longer optional and how it impacts your bottom line.',
    author: 'Marcus Rodriguez',
    date: 'Oct 8, 2025',
    readTime: '4 min read',
    category: 'Web Development'
  },
  {
    id: 3,
    thumbnail: 'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'The Subscription Model: Flexibility That Scales With Your Growth',
    preview: 'Explore how subscription-based services provide the agility modern businesses need, without the burden of long-term contracts or upfront costs.',
    author: 'Emily Thompson',
    date: 'Oct 5, 2025',
    readTime: '6 min read',
    category: 'Business Strategy'
  },
  {
    id: 4,
    thumbnail: 'https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'From Manual to Automated: A Case Study in Workflow Optimization',
    preview: 'See how one company reduced processing time by 75% through strategic automation implementation, and learn the key steps they took to achieve success.',
    author: 'David Park',
    date: 'Oct 2, 2025',
    readTime: '7 min read',
    category: 'Case Studies'
  }
];

export function TechInsights() {
  return (
    <section className="py-24 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Tech <span className="text-gradient">Insights</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Expert perspectives on automation, web development, and digital transformation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className="group relative bg-navy-700/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-aqua-500/10 hover:border-aqua-500/30 transition-all duration-300 hover:transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-aqua-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 bg-aqua-500/90 backdrop-blur-sm text-navy-900 text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-aqua-500 transition-colors duration-300">
                    {post.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.preview}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{post.date}</span>
                    <button className="flex items-center gap-2 text-aqua-500 text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
