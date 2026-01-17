import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageHeader } from "@/components/common/PageHeader";

const FormsPage = () => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6 p-4 md:p-6"
    >
      <PageHeader
        title={t("pages.components.forms.title")}
        description={t("pages.components.forms.description")}
      />

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("pages.components.forms.examples.title")}</CardTitle>
            <CardDescription>
              {t("pages.components.forms.examples.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-w-md">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("pages.components.forms.examples.basic.name")}
                  </label>
                  <Input
                    placeholder={t(
                      "pages.components.forms.examples.basic.namePlaceholder"
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("pages.components.forms.examples.basic.email")}
                  </label>
                  <Input
                    type="email"
                    placeholder={t(
                      "pages.components.forms.examples.basic.emailPlaceholder"
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("pages.components.forms.examples.basic.category")}
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t(
                          "pages.components.forms.examples.basic.categoryPlaceholder"
                        )}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">Option 1</SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                      <SelectItem value="option3">Option 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>
                  {t("pages.components.forms.examples.basic.submit")}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default FormsPage;
