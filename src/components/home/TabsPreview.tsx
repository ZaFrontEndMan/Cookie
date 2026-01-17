
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const TabsPreview = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <Card className="select-none pointer-events-none bg-gradient-to-br from-env-deep-teal/5 to-env-lime/10 border-env-forest/20">
        <CardHeader>
          <CardTitle className="text-2xl font-bold rtl:bg-gradient-to-r bg-gradient-to-l from-env-forest to-env-lime bg-clip-text text-transparent">
            Tabs Component Preview
          </CardTitle>
          <CardDescription className="text-env-deep-teal/70 dark:text-env-sage/80">
            Interactive tab component for organizing content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-env-deep-teal/10">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-env-lime/20 data-[state=active]:text-env-deep-teal"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="features" 
                className="data-[state=active]:bg-env-lime/20 data-[state=active]:text-env-deep-teal"
              >
                Features
              </TabsTrigger>
              <TabsTrigger 
                value="usage" 
                className="data-[state=active]:bg-env-lime/20 data-[state=active]:text-env-deep-teal"
              >
                Usage
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-6">
              <div className="p-6 bg-env-sage/10 rounded-lg border border-env-forest/20">
                <h3 className="text-lg font-semibold mb-3 text-env-deep-teal">Component Overview</h3>
                <p className="text-env-deep-teal/80 dark:text-env-sage/90 mb-4">
                  Our tab component provides a clean and intuitive way to organize content into separate sections. 
                  Built with accessibility in mind and fully customizable.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-env-lime/10 rounded border border-env-lime/30">
                    <span className="text-sm font-medium text-env-forest">Accessible</span>
                  </div>
                  <div className="p-3 bg-env-bright-lime/10 rounded border border-env-bright-lime/30">
                    <span className="text-sm font-medium text-env-forest">Responsive</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="features" className="mt-6">
              <div className="p-6 bg-env-lime/10 rounded-lg border border-env-lime/20">
                <h3 className="text-lg font-semibold mb-3 text-env-deep-teal">Key Features</h3>
                <ul className="space-y-2 text-env-deep-teal/80 dark:text-env-sage/90">
                  <li>• Keyboard navigation support</li>
                  <li>• Smooth transitions and animations</li>
                  <li>• Customizable styling with Tailwind CSS</li>
                  <li>• TypeScript support for better development</li>
                  <li>• Built on Radix UI primitives</li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="usage" className="mt-6">
              <div className="p-6 bg-env-bright-lime/10 rounded-lg border border-env-bright-lime/20">
                <h3 className="text-lg font-semibold mb-3 text-env-deep-teal">Usage Examples</h3>
                <p className="text-env-deep-teal/80 dark:text-env-sage/90 mb-4">
                  Perfect for dashboards, settings panels, product catalogs, and any interface 
                  that needs organized content sections.
                </p>
                <div className="bg-env-deep-teal/5 p-3 rounded text-sm font-mono text-env-forest">
                  &lt;Tabs defaultValue="tab1"&gt;<br/>
                  &nbsp;&nbsp;&lt;TabsList&gt;...&lt;/TabsList&gt;<br/>
                  &nbsp;&nbsp;&lt;TabsContent&gt;...&lt;/TabsContent&gt;<br/>
                  &lt;/Tabs&gt;
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TabsPreview;
